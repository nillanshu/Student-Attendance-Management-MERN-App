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
        if (verifyToken.role !== 'SubjectTeacher') {
            throw new Error('Unauthorized');
        }
        const rootUser = await models.tblsubjteacher.findOne({
            where: { emailAddress: verifyToken.emailAddress, id: verifyToken.userId },
            attributes: ['firstName', 'lastName', 'emailAddress', 'classId', 'classArmId', 'subjId']
        });
        if (!rootUser) { throw new Error('User not found') }
        // req.token = token;
        // req.rootUser = rootUser;
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
        const rootUser = req.rootUser;
        const classId = rootUser.classId;
        const classArmId = rootUser.classArmId;
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
        result.className = rootUser.tblclass.className;
        result.classArmName = rootUser.tblclassarm.classArmName;
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
      classArmName: null,
      subjName: null,
    };
    const rootUser = req.rootUser;
    result.className = rootUser.tblclass.dataValues.className;
    result.classArmName = rootUser.tblclassarm.dataValues.classArmName;
    result.subjName = rootUser.tblsubject.dataValues.subjName;
    const { subjId, classId, classArmId } = rootUser.dataValues;
    result.students = await models.tblstudents.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "admissionNumber",
        "classId",
        "classArmId",
      ],
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
      where: { classId, classArmId },
    });

    let dateTimeTaken = moment().format("YYYY-MM-DD");

    const sessionTerm = await models.tblsessionterm.findOne({
      where: { isActive: "1" },
    });
    if (!sessionTerm) {
      throw new Error("No active session term found");
    }
    const sessionTermId = sessionTerm.dataValues.id;

    const attendanceCount = await models.tblattendance.count({
      where: {
        classId,
        classArmId,
        sessionTermId,
        subjId,
        dateTimeTaken,
      },
    });

    if (attendanceCount === 0) {
      await Promise.all(
        result.students.map((student) =>
          models.tblattendance.create({
            admissionNumber: student.admissionNumber,
            classId,
            classArmId,
            subjId,
            sessionTermId,
            status: "0",
            dateTimeTaken,
          })
        )
      );
    }
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send("An error occurred while fetching students!");
    }
  } catch (error) {
    res.status(500).send(`An error occurred! Error: ${error.message}`);
  }
}

async function takeAttendance(req, res) {
    try {
        const {classId, classArmId, subjId} = req.rootUser;
        const { check } = req.body;

        const dateTimeTaken = moment().format('YYYY-MM-DD');

        const attendance = await models.tblattendance.findOne({
            where: {
                classId,
                classArmId,
                subjId,
                dateTimeTaken,
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
                        subjId,
                        admissionNumber: admissionNo,
                        dateTimeTaken
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

async function viewClassAttendance(req, res) {
    try {
        const dateTimeTaken = req.body.dateTimeTaken;
        const rootUser = req.rootUser;
        const classId = rootUser.classId;
        const classArmId = rootUser.classArmId;
        const subjId = rootUser.subjId;
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
                }
            ],
            where: {classId, classArmId, subjId, dateTimeTaken},
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
        const { dateType, admissionNumber, dateTimeTaken, fromDate, toDate } = req.body;
        const rootUser = req.rootUser;
        const { classId, classArmId, subjId } = rootUser;

        let whereClause = { classId, classArmId, subjId, admissionNumber };

        if (dateType === 'By Single Date') {
            whereClause.dateTimeTaken = dateTimeTaken;
        } else if (dateType === 'By Date Range') {
            whereClause.dateTimeTaken = { [Op.between]: [fromDate, toDate] };
        }

        const options = {
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
                }
            ],
            where: whereClause
        };

        const result = await models.tblattendance.findAll(options);

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
        const rootUser = req.rootUser;
        const classId = rootUser.classId;
        const classArmId = rootUser.classArmId;
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
    const teacher = req.rootUser;
    const { classId, classArmId, subjId } = teacher;

    const dateTimeTaken = moment().format("YYYY-MM-DD");

    const attendance = await models.tblattendance.findAll({
      where: {
        classId,
        classArmId,
        subjId,
        dateTimeTaken,
        status: "1",
      },
      include: [
        {
          model: models.tblclass,
          required: true,
        },
        {
          model: models.tblclassarms,
          required: true,
        },
        {
          model: models.tblsubject,
          required: true,
        },
        {
          model: models.tblsessionterm,
          required: true,
          include: [
            {
              model: models.tblterm,
              required: true,
            },
          ],
        },
      ],
    });

    if (!attendance) {
      return res.status(404).send("No attendance records found for today");
    }

    let data = attendance.map((record) => ({
      "Admission Number": record.admissionNumber,
      "Class Name": record.tblclass.className,
      "Class Arm Name": record.tblclassarm.classArmName,
      "Subject Name": record.tblsubject.subjName,
      "Date Taken": record.dateTimeTaken,
      Session: record.tblsessionterm.sessionName,
      Term: record.tblsessionterm.tblterm.termName,
      Status: record.status,
    }));

    let workbook = xlsx.utils.book_new();
    let worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Attendance");
    let buffer = xlsx.write(workbook, { type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attendance.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
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