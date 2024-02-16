const models = require('../models');
require('../helpers/associations');
const jwt = require('jsonwebtoken');
// const moment = require('moment');
const {Op} = require('sequelize');


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
    viewAttendance
};