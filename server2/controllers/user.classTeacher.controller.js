const models = require('../models');
require('../helpers/associations');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const {Op} = require('sequelize');

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
            attributes: ['firstName', 'lastName', 'admissionNumber'],
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
        console.log(sessionTerm.dataValues.id);
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
                where: {
                    classId: classId,
                    classArmId: classArmId
                }
            });

            // Use Promise.all to perform all the create operations concurrently
            await Promise.all(students.map(student =>
                models.tblattendance.create({
                    admissionNo: student.admissionNumber,
                    classId: classId,
                    classArmId: classArmId,
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
            return res.status(400).send("Attendance has already been taken for today");
        }

        for (let i = 0; i < check.length; i++) {
            if (check[i]) {
                const updatedAttendance = await models.tblattendance.update({ status: '1' }, {
                    where: {
                        admissionNo: check[i]
                    }
                });

                if (!updatedAttendance) {
                    return res.status(500).send("An error occurred while updating attendance");
                }
            }
        }

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

// BUG - not getting the student first name and last name from tblstudents
async function viewStudentAttendance(req, res) {
    try {
        let result = null;
        const {dateType, admissionNumber, dateTimeTaken, fromDate, toDate} = req.body;
        if (dateType === 'all') {
            const token = req.cookies.jwtoken;
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            const id = decodedToken.userId;
            const teacher = await models.tblclassteacher.findAll({
                attributes: ["classId", "classArmId"],
                where: { id }
            })
            const classId = teacher[0].dataValues.classId;
            const classArmId = teacher[0].dataValues.classArmId;
            console.log(classId, classArmId, admissionNumber);
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
                where: {classId, classArmId, admissionNumber}
            });
        } else if (dateType === 'bySingleDate') {
            const token = req.cookies.jwtoken;
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            const id = decodedToken.userId;
            const teacher = await models.tblclassteacher.findAll({
                attributes: ["classId", "classArmId"],
                where: { id }
            })
            const classId = teacher[0].dataValues.classId;
            const classArmId = teacher[0].dataValues.classArmId;
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
                where: {classId, classArmId, admissionNumber, dateTimeTaken}
            });
        } else if (dateType === 'byDateRange') {
            const token = req.cookies.jwtoken;
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            const id = decodedToken.userId;
            const teacher = await models.tblclassteacher.findAll({
                attributes: ["classId", "classArmId"],
                where: { id }
            })
            const classId = teacher[0].dataValues.classId;
            const classArmId = teacher[0].dataValues.classArmId;
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
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error occurred while fetching attendance!</div>");
        }
    } catch (error) {
        res.status(500).send(`<div className='alert alert-danger' style='margin-right:700px;'>An error occurred! Error: ${error.message}</div>`);
    }
}




module.exports = {
    dashboard,
    teacherAuth,
    viewStudents,
    loadTakeAttendancePage,
    takeAttendance,
    viewClassAttendance,
    viewStudentAttendance
}