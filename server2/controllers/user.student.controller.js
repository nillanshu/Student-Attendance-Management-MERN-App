const models = require('../models');
require('../helpers/associations');
const jwt = require('jsonwebtoken');
// const moment = require('moment');
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

async function studentAuth(req, res) {
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.JWT_KEY);
        if (verifyToken.role !== 'Student') {
            throw new Error('Unauthorized');
        }
        const rootUser = await models.tblstudents.findOne({
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

async function viewAttendance(req, res) {
    try {
        let result = null;
        const {dateType, dateTimeTaken, fromDate, toDate} = req.body;
        if (dateType === 'all') {
            const token = req.cookies.jwtoken;
            console.log(req);
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            const id = decodedToken.userId;
            const student = await models.tblstudents.findAll({
                attributes: ["classId", "classArmId", "admissionNumber"],
                where: { id }
            })
            const classId = student[0].dataValues.classId;
            const classArmId = student[0].dataValues.classArmId;
            const admissionNumber = student[0].dataValues.admissionNumber;
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
                        attributes: ['admissionNumber', 'firstName', 'lastName'],
                        required: false
                    }
                ],
                where: {classId, classArmId, admissionNumber}
            });
        } else if (dateType === 'bySingleDate') {
            const token = req.cookies.jwtoken;
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            const id = decodedToken.userId;
            const student = await models.tblstudents.findAll({
                attributes: ["classId", "classArmId", "admissionNumber"],
                where: { id }
            })
            const classId = student[0].dataValues.classId;
            const classArmId = student[0].dataValues.classArmId;
            const admissionNumber = student[0].dataValues.admissionNumber;
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
                        attributes: ['admissionNumber', 'firstName', 'lastName'],
                        required: false
                    }
                ],
                where: {classId, classArmId, admissionNumber, dateTimeTaken}
            });
        } else if (dateType === 'byDateRange') {
            const token = req.cookies.jwtoken;
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            const id = decodedToken.userId;
            const student = await models.tblstudents.findAll({
                attributes: ["classId", "classArmId", "admissionNumber"],
                where: { id }
            })
            const classId = student[0].dataValues.classId;
            const classArmId = student[0].dataValues.classArmId;
            const admissionNumber = student[0].dataValues.admissionNumber;
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
                        attributes: ['admissionNumber', 'firstName', 'lastName'],
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
    viewAttendance,
    dashboard,
    studentAuth
};