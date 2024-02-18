const jwt = require('jsonwebtoken');
const models = require('../models');

async function CheckAdminAuth(req, res, next) {
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.JWT_KEY);
        if (verifyToken.role !== 'Administrator') {
            throw new Error('Unauthorized');
        }
        const rootUser = await models.tbladmin.findOne({
            where: { emailAddress: verifyToken.emailAddress, id: verifyToken.userId },
            attributes: ['firstName', 'lastName', 'emailAddress']
        });
        if (!rootUser) { throw new Error('User not found') }
        req.token = token;
        req.rootUser = rootUser;
        next();
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }
}

async function CheckTeacherAuth(req, res, next) {
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
        next();
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }
}

async function CheckStudentAuth(req, res, next) {
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
        next();
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }
}

module.exports = {
    CheckAdminAuth,
    CheckTeacherAuth,
    CheckStudentAuth
}
