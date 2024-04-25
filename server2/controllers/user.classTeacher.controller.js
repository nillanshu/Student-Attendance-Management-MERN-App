const models = require('../models');
require('../helpers/associations');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const {Op} = require('sequelize');
const xlsx = require('xlsx');

async function dashboard(req, res) {
    try {
        //fetch all data
        const [students, classes, classArms, totalAttendance] = await Promise.all([
            models.tblstudents.count(),
            models.tblclass.count(),
            models.tblclassarms.count(),
            models.tblattendance.count(),
        ]);

        const data = [
            {
              rootUser: req.rootUser
            },
            {
              dashboardCounts: {
                students,
                classes,
                classArms,
                totalAttendance,
              }
            }
        ];

        res.status(200).send(data);
    } catch(error) {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    }
}

async function teacherAuth(req, res) {
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.JWT_KEY);
        if (verifyToken.role !== 'ClassTeacher') {
            throw new Error('Unauthorized');
        }
        const rootUser = await models.tblclassteacher.findOne({
            where: { emailAddress: verifyToken.emailAddress, id: verifyToken.userId },
            attributes: ['firstName', 'lastName', 'emailAddress']
        });
        if (!rootUser) { throw new Error('User not found') }
        req.token = token;
        req.rootUser = rootUser;
        return res.status(200).send(rootUser);
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }
}

// manage students
async function viewStudents(req, res) {
    try {
        const result = {
            students: null,
            className: null,
            classArmName: null
        }
        const token = req.cookies.jwtoken;
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const id = decodedToken.userId;
        const teacher = await models.tblclassteacher.findAll({
            attributes: ["classId", "classArmId"],
            where: { id },
            include: [{
                model: models.tblclass,
                attributes: ['className'],
                required: true
            },
            {
                model: models.tblclassarms,
                attributes: ['classArmName'],
                required: true
            }]
        })
        const classId = teacher[0].classId;
        const classArmId = teacher[0].classArmId;
        const students = await models.tblstudents.findAll({
            attributes: ['id', 'firstName', 'lastName', 'emailAddress', 'admissionNumber', 'phoneNo', 'createdAt'],
            include: [{
                model: models.tblclass,
                attributes: ['className'],
                required: true
            },
            {
                model: models.tblclassarms,
                attributes: ['classArmName'],
                required: true
            }],
            where: {classId, classArmId}
        });
        result.students = students;
        result.className = teacher[0].tblclass.className;
        result.classArmName = teacher[0].tblclassarm.classArmName;
        if (result) {
            res.status(200).send(result);
        } else {
            res.send("An error occurred while fetching students!");
        }
    } catch (error) {
        res.status(500).send(`An error occurred! Error: ${error.message}`);
    }
}

// manage attendance

async function loadTakeAttendancePage(req, res) {
    try {
        const result = {
            students: null,
            className: null,
            classArmName: null
        };
        const token = req.cookies.jwtoken;
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const id = decodedToken.userId;
        const teacher = await models.tblclassteacher.findAll({
            attributes: ["classId", "classArmId"],
            where: { id },
            include: [{
                model: models.tblclass,
                attributes: ['className'],
                required: true
            },
            {
                model: models.tblclassarms,
                attributes: ['classArmName'],
                required: true
            }]
        })
        result.className = teacher[0].tblclass.className;
        result.classArmName = teacher[0].tblclassarm.classArmName;
        const classId = teacher[0].dataValues.classId;
        const classArmId = teacher[0].dataValues.classArmId;
        result.students = await models.tblstudents.findAll({
            attributes: ['id', 'firstName', 'lastName', 'admissionNumber'],
            include: [{
                model: models.tblclass,
                attributes: ['className'],
                required: true
            },
            {
                model: models.tblclassarms,
                attributes: ['classArmName'],
                required: true
            }],
            where: {classId, classArmId}
        });

        let dateTaken = moment().format('YYYY-MM-DD');

        // Fetch active session term
        const sessionTerm = await models.tblsessionterm.findOne({ where: { isActive: '1' } });
        if (!sessionTerm) {
            throw new Error("No active session term found");
        }
        const sessionTermId = sessionTerm.dataValues.id;

        // Check if attendance record exists
        const attendanceCount = await models.tblattendance.count({
            where: {
                classId: classId,
                classArmId: classArmId,
                sessionTermId: sessionTermId,
                dateTimeTaken: dateTaken
            }
        });

        // If no attendance record exists, create new records
        if (attendanceCount === 0) {
            let students = await models.tblstudents.findAll({
                attributes: ['admissionNumber', 'classId', 'classArmId'],
                where: {
                    classId: classId,
                    classArmId: classArmId
                }
            });

            // Use Promise.all to perform all the create operations concurrently
            await Promise.all(students.map(student =>
                models.tblattendance.create({
                    admissionNumber: student.admissionNumber,
                    classId: student.classId,
                    classArmId: student.classArmId,
                    sessionTermId: sessionTermId,
                    status: '0',
                    dateTimeTaken: dateTaken
                })
            ));
        }

        if (result) {
            res.status(200).send(result);
        } else {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error occurred while fetching students!</div>");
        }
    } catch (error) {
        res.status(500).send(`<div className='alert alert-danger' style='margin-right:700px;'>An error occurred! Error: ${error.message}</div>`);
    }
}

async function takeAttendance(req, res) {
    try {
        const token = req.cookies.jwtoken;
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const id = decodedToken.userId;

        const teacher = await models.tblclassteacher.findOne({
            attributes: ["classId", "classArmId"],
            where: { id }
        });

        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        const { classId, classArmId } = teacher.dataValues;
        const { check } = req.body;

        const dateTaken = moment().format('YYYY-MM-DD');

        const attendance = await models.tblattendance.findOne({
            where: {
                classId,
                classArmId,
                dateTimeTaken: dateTaken,
                status: '1'
            }
        });

        if (attendance) {
            return res.status(400).json({ message: "Attendance has already been taken for today" });
        }

        let updatePromises = check.map((admissionNo) => {
            if (admissionNo) {
                return models.tblattendance.update({ status: '1' }, {
                    where: {
                        classId,
                        classArmId,
                        admissionNumber: admissionNo
                    }
                });
            }
        });

        await Promise.all(updatePromises);

        return res.status(200).send("Attendance taken successfully");
    } catch (error) {
        return res.status(500).send(`An error occurred: ${error.message}`);
    }
}

// BUG - not getting the student first name and last name from tblstudents
// gotta add subjId atrribute to tblattendance
async function viewClassAttendance(req, res) {
    try {
        const dateTimeTaken = req.body.dateTimeTaken;
        const token = req.cookies.jwtoken;
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const id = decodedToken.userId;
        const teacher = await models.tblclassteacher.findAll({
            attributes: ["classId", "classArmId"],
            where: { id }
        })
        const classId = teacher[0].dataValues.classId;
        const classArmId = teacher[0].dataValues.classArmId;
        const result = await models.tblattendance.findAll({
            attributes: ["id", "admissionNumber", "status", "dateTimeTaken"],
            include: [
                {
                  model: models.tblclass,
                  attributes: ['className'],
                  required: true
                },
                {
                  model: models.tblclassarms,
                  attributes: ['classArmName'],
                  required: true
                },
                {
                  model: models.tblsessionterm,
                  attributes: ['sessionName'],
                  required: true,
                  include: [
                    {
                      model: models.tblterm,
                      attributes: ['termName'],
                      required: true
                    }
                  ]
                },
                {
                  model: models.tblstudents,
                  attributes: ['firstName', 'lastName', 'admissionNumber'],
                  required: false
                }
            ],
            where: {classId, classArmId, dateTimeTaken},
        });
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send("An error occurred while fetching attendance!");
        }
    } catch (error) {
        res.status(500).send(`An error occurred! Error: ${error.message}`);
    }
}

async function viewStudentAttendance(req, res) {
    try {
        let result = null;
        const {dateType} = req.body;
        const token = req.cookies.jwtoken;
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const id = decodedToken.userId;
        const teacher = await models.tblclassteacher.findAll({
            attributes: ["classId", "classArmId"],
            where: { id }
        })
        const classId = teacher[0].dataValues.classId;
        const classArmId = teacher[0].dataValues.classArmId;

        if (dateType === 'All') {
            const {admissionNumber} = req.body;
            result = await models.tblattendance.findAll({
                attributes: ["id", "admissionNumber", "status", "dateTimeTaken"],
                include: [
                    {
                        model: models.tblclass,
                        attributes: ['className'],
                        required: true
                    },
                    {
                        model: models.tblclassarms,
                        attributes: ['classArmName'],
                        required: true
                    },
                    {
                        model: models.tblsessionterm,
                        attributes: ['sessionName'],
                        required: true,
                        include: [
                            {
                                model: models.tblterm,
                                attributes: ['termName'],
                                required: true
                            }
                        ]
                    },
                    {
                        model: models.tblstudents,
                        attributes: ['admissionNumber'],
                        required: false
                    }
                ],
                where: {classId, classArmId, admissionNumber}
            });
        } else if (dateType === 'By Single Date') {
            const {admissionNumber, dateTimeTaken} = req.body;
            result = await models.tblattendance.findAll({
                attributes: ["id", "admissionNumber", "status", "dateTimeTaken"],
                include: [
                    {
                        model: models.tblclass,
                        attributes: ['className'],
                        required: true
                    },
                    {
                        model: models.tblclassarms,
                        attributes: ['classArmName'],
                        required: true
                    },
                    {
                        model: models.tblsessionterm,
                        attributes: ['sessionName'],
                        required: true,
                        include: [
                            {
                                model: models.tblterm,
                                attributes: ['termName'],
                                required: true
                            }
                        ]
                    },
                    {
                        model: models.tblstudents,
                        attributes: ['admissionNumber'],
                        required: false
                    }
                ],
                where: {classId, classArmId, admissionNumber, dateTimeTaken}
            });
        } else if (dateType === 'By Date Range') {
            const {admissionNumber, fromDate, toDate} = req.body;
            result = await models.tblattendance.findAll({
                attributes: ["admissionNumber", "status", "dateTimeTaken"],
                include: [
                    {
                        model: models.tblclass,
                        attributes: ['className'],
                        required: true
                    },
                    {
                        model: models.tblclassarms,
                        attributes: ['classArmName'],
                        required: true
                    },
                    {
                        model: models.tblsessionterm,
                        attributes: ['sessionName'],
                        required: true,
                        include: [
                            {
                            model: models.tblterm,
                            attributes: ['termName'],
                            required: true
                            }
                        ]
                    },
                    {
                        model: models.tblstudents,
                        attributes: ['admissionNumber'],
                        required: false
                    }
                ],
                where: {
                    classId,
                    classArmId,
                    admissionNumber,
                    dateTimeTaken: {
                        [Op.between]: [fromDate, toDate]
                    }
                }
            });
        }
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send("An error occurred while fetching attendance!");
        }
    } catch (error) {
        res.status(500).send(`An error occurred! Error: ${error.message}`);
    }
}

async function getAllStudents(req, res) {
    try {
        const token = req.cookies.jwtoken;
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const id = decodedToken.userId;
        const teacher = await models.tblclassteacher.findAll({
            attributes: ["classId", "classArmId"],
            where: { id }
        })
        const classId = teacher[0].dataValues.classId;
        const classArmId = teacher[0].dataValues.classArmId;
        const result = await models.tblstudents.findAll({
            attributes: ['admissionNumber', 'firstName', 'lastName'],
            where: {classId, classArmId}
        });
        if (result) {
            res.status(200).send(result);
        } else {
            res.send("An error occurred while fetching students!");
        }
    } catch (error) {
        res.status(500).send(`An error occurred! Error: ${error.message}`);
    }

}


async function downloadAttendance(req, res) {
    try {
        const token = req.cookies.jwtoken;
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const id = decodedToken.userId;
        const teacher = await models.tblclassteacher.findOne({
            attributes: ["classId", "classArmId"],
            where: { id }
        });
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }
        const { classId, classArmId } = teacher.dataValues;

        const dateTaken = moment().format('YYYY-MM-DD');

        const attendance = await models.tblattendance.findAll({
            where: {
                classId,
                classArmId,
                dateTimeTaken: dateTaken,
                status: '1'
            },
            include: [
                {
                    model: models.tblclass,
                    required: true
                },
                {
                    model: models.tblclassarms,
                    required: true
                },
                {
                    model: models.tblsessionterm,
                    required: true,
                    include: [{
                        model: models.tblterm,
                        required: true
                    }]
                }
            ]
        });

        if (!attendance) {
            return res.status(404).send("No attendance records found for today");
        }
        
        let data = attendance.map(record => ({
            'Admission Number': record.admissionNumber,
            'Class Name': record.tblclass.className,
            'Class Arm Name': record.tblclassarm.classArmName,
            'Date Taken': record.dateTimeTaken,
            'Session': record.tblsessionterm.sessionName,
            'Term': record.tblsessionterm.tblterm.termName,
            'Status': record.status
        }));

        let workbook = xlsx.utils.book_new();
        let worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Attendance');
        let buffer = xlsx.write(workbook, {type: 'buffer'});

        res.setHeader('Content-Disposition', 'attachment; filename=attendance.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        return res.status(500).send(`An error occurred: ${error.message}`);
    }
}


module.exports = {
    dashboard,
    teacherAuth,
    viewStudents,
    loadTakeAttendancePage,
    takeAttendance,
    viewClassAttendance,
    getAllStudents,
    viewStudentAttendance,
    downloadAttendance
}