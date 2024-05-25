const models = require('../models');
require('../helpers/associations');
const jwt = require('jsonwebtoken');
// const moment = require('moment');
const {Op} = require('sequelize');

async function dashboard(req, res) {
    try {
        const rootUser = req.rootUser;
        const { classId, classArmId, admissionNumber } = rootUser;

        const subjects = await models.tblsubject.findAll({
            attributes: ["id", "subjName"],
            where: { classId, classArmId }
        });

        let whereClause = { 
            classId, 
            classArmId, 
            admissionNumber
        };

        const options = {
            attributes: ["id", "admissionNumber", "status", "subjId"],
            where: whereClause
        };

        const result = await models.tblattendance.findAll(options);

        if (result) {
            const totalAttendance = result.length;
            const presentAttendance = result.filter(record => record.status === '1').length;
            const overallAttendancePercentage = Math.ceil((presentAttendance / totalAttendance) * 100);

            const subjectWiseAttendance = await Promise.all(subjects.map(async (subject) => {
                const subjectData = subject.dataValues;
                const subjectAttendance = result.filter(record => Number(record.subjId) === subjectData.id);
                const subjectPresentAttendance = subjectAttendance.filter(record => record.status === '1').length;
                const subjectAttendancePercentage = Math.ceil((subjectPresentAttendance / subjectAttendance.length) * 100);
            
                return {
                    subjName: subjectData.subjName,
                    attendancePercentage: isNaN(subjectAttendancePercentage) ? 0 : subjectAttendancePercentage
                };
            }));

            res.status(200).json([
                {
                    subjName: "Overall Attendance",
                    attendancePercentage: overallAttendancePercentage
                },
                ...subjectWiseAttendance
            ]);
        } else {
            res.status(400).send("An error occurred while fetching attendance!");
        }
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
        const token = req.cookies.jwtoken;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const id = decodedToken.userId;

        const student = await models.tblstudents.findOne({
            attributes: ["classId", "classArmId", "admissionNumber"],
            where: { id }
        })

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const { classId, classArmId, admissionNumber } = student.dataValues;
        const { dateType, dateTimeTaken, fromDate, toDate } = req.query;

        let whereClause = { classId, classArmId, admissionNumber };

        if (dateType === 'By Single Date') {
            whereClause.dateTimeTaken = dateTimeTaken;
        } else if (dateType === 'By Date Range') {
            whereClause.dateTimeTaken = { [Op.between]: [fromDate, toDate] };
        }

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
            where: whereClause
        });

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).json({ message: "An error occurred while fetching attendance!" });
        }
    } catch (error) {
        res.status(500).json({ message: `An error occurred! Error: ${error.message}` });
    }
}


module.exports = {
    viewAttendance,
    dashboard,
    studentAuth
};