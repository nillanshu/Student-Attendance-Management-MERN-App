const models = require('../models');
require('../helpers/associations');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function dashboard(req, res) {
    try {
        //fetch all data
        const [students, classes, classArms, totalAttendance, classTeachers, sessionNTerms, terms] = await Promise.all([
            models.tblstudents.count(),
            models.tblclass.count(),
            models.tblclassarms.count(),
            models.tblattendance.count(),
            models.tblclassteacher.count(),
            models.tblsessionterm.count(),
            models.tblterm.count()
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
                classTeachers,
                sessionNTerms,
                terms
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

async function adminAuth(req, res) {
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
        return res.status(200).send(rootUser);
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }
}

// class apis

async function getAllClasses(req, res) {
    try {
        const classes = await models.tblclass.findAll();
        if (classes) {
            res.status(200).send(classes);
        } else {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred while fetching classes!</div>");
        }
    } catch (error) {
        res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred!</div>");
    }
}

async function createClass(req, res) {
    const { className } = req.body;
    try {
        const existingClass = await models.tblclass.findOne({ where: { className } });

        if (existingClass) {
          res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Class Already Exists!</div>");
        } else {
          await models.tblclass.create({ className });
          res.send("<div className='alert alert-success'  style='margin-right:700px;'>Created Successfully!</div>");
        }
      } catch (error) {
        res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred!</div>");
      }
}

async function editClass(req, res) {
    const id = req.params.id;
    const { className } = req.body;
    try {
        const existingClass = await models.tblclass.findOne({ where: { id } });

        if (!existingClass) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Class Does Not Exist!</div>");
        } else {
            await models.tblclass.update({ className }, { where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Updated Successfully!</div>");
        }
    } catch (error) {
        res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred!</div>");
    }
}

async function deleteClass(req, res) {
    const id = req.params.id;
    try {
        const existingClass = await models.tblclass.findOne({ where: { id } });

        if (!existingClass) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Class Does Not Exist!</div>");
        } else {
            await models.tblclass.destroy({ where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Deleted Successfully!</div>");
        }
    } catch (error) {
        res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred!</div>");
    }
}

// classArms apis

async function getAllClassArms(req, res) {
    try {
        const result = await models.tblclassarms.findAll({
            attributes: ['Id', 'isAssigned', 'classArmName'],
            include: [{
              model: models.tblclass,
              attributes: ['className'],
              required: true
            }]
        });
        if (result) {
            res.status(200).send(result);
        } else {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred while fetching classes!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

async function createClassArm(req, res) {
    const { classId, classArmName } = req.body;
    const isAssigned = "0";
    try {
        const existingClassArm = await models.tblclassarms.findOne({ where: { classId, classArmName } });

        if (existingClassArm) {
          res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Class Arm Already Exists!</div>");
        } else {
          await models.tblclassarms.create({ classId, classArmName, isAssigned });
          res.send("<div className='alert alert-success'  style='margin-right:700px;'>Created Successfully!</div>");
        }
      } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
      }
}

async function editClassArm(req, res) {
    const id = req.params.id;
    const { classId, classArmName } = req.body;
    try {
        const existingClassArm = await models.tblclassarms.findOne({ where: { id } });

        if (!existingClassArm) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Class Does Not Exist!</div>");
        } else {
            await models.tblclassarms.update({ classId, classArmName }, { where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Updated Successfully!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

async function deleteClassArm(req, res) {
    const id = req.params.id;
    try {
        const existingClassArm = await models.tblclassarms.findOne({ where: { id } });

        if (!existingClassArm) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Class Does Not Exist!</div>");
        } else {
            await models.tblclassarms.destroy({ where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Deleted Successfully!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

//class teacher apis
async function getAllClassTeachers(req, res) {
    try {
        const result = await models.tblclassteacher.findAll({
            attributes: ['firstName', 'lastName', 'emailAddress', 'phoneNo', 'createdAt'],
            include: [{
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
                model: models.tblsubject,
                attributes: ['subjName'],
                required: true
            }]
        });
        if (result) {
            res.status(200).send(result);
        } else {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred while fetching class Teachers!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

async function createClassTeacher(req, res) {
    const { firstName, lastName, emailAddress, classId, classArmId, phoneNo, subjId } = req.body;
    let samplePassword = 'pass123';
    const salt = await bcryptjs.genSalt(10);
    samplePassword = await bcryptjs.hash(samplePassword, salt);
    try {
        const existingClassTeacher = await models.tblclassteacher.findOne({ where: { emailAddress } });

        if (existingClassTeacher) {
          res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Teacher Already Exists!</div>");
        } else {
          await models.tblclassteacher.create({ firstName, lastName, emailAddress, password: samplePassword, classId, classArmId, phoneNo, subjId });
          res.send("<div className='alert alert-success'  style='margin-right:700px;'>Created Successfully!</div>");
        }
      } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
      }
}

async function getClassArmsByClass(req, res) {
    const className = req.body.className;
    try {
        const result = await models.tblclassarms.findAll({
            attributes: ['Id', 'isAssigned', 'classArmName'],
            include: [{
              model: models.tblclass,
              attributes: ['className'],
              required: true,
              where: {className}
            }]
        });
        if (result) {
            res.status(200).send(result);
        } else {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred while fetching classArms!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

async function editClassTeacher(req, res) {
    const id = req.params.id;
    const { firstName, lastName, emailAddress, classId, classArmId, phoneNo, subjId } = req.body;
    try {
        const existingTeacher = await models.tblclassteacher.findOne({ where: { id } });

        if (!existingTeacher) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Teacher Does Not Exist!</div>");
        } else {
            await models.tblclassteacher.update({ firstName, lastName, emailAddress, classId, classArmId, phoneNo, subjId }, { where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Updated Successfully!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error}</div>`);
    }
}

async function deleteClassTeacher(req, res) {
    const id = req.params.id;
    try {
        const existingClassTeacher = await models.tblclassteacher.findOne({ where: { id } });

        if (!existingClassTeacher) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Class Teacher Does Not Exist!</div>");
        } else {
            await models.tblclassteacher.destroy({ where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Deleted Successfully!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

//Student apis
async function getAllStudents(req, res) {
    try {
        const result = await models.tblstudents.findAll({
            attributes: ['firstName', 'lastName', 'emailAddress', 'admissionNumber', 'phoneNo', 'createdAt'],
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
        });
        if (result) {
            res.status(200).send(result);
        } else {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred while fetching students!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

async function createStudent(req, res) {
    const { firstName, lastName, admissionNumber, emailAddress, phoneNo, classId, classArmId } = req.body;
    let samplePassword = 'pass123';
    const salt = await bcryptjs.genSalt(10);
    samplePassword = await bcryptjs.hash(samplePassword, salt);
    try {
        const existingStudent = await models.tblstudents.findOne({ where: { emailAddress } });

        if (existingStudent) {
          res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Student Already Exists!</div>");
        } else {
          await models.tblstudents.create({ firstName, lastName, admissionNumber, emailAddress, password: samplePassword, phoneNo, classId, classArmId });
          res.send("<div className='alert alert-success'  style='margin-right:700px;'>Created Successfully!</div>");
        }
      } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
      }
}

async function editStudent(req, res) {
    const id = req.params.id;
    const { firstName, lastName, admissionNumber, emailAddress, phoneNo, classId, classArmId } = req.body;
    try {
        const existingStudent = await models.tblstudents.findOne({ where: { id } });

        if (!existingStudent) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Student Does Not Exist!</div>");
        } else {
            await models.tblstudents.update({ firstName, lastName, admissionNumber, emailAddress, phoneNo, classId, classArmId }, { where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Updated Successfully!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error}</div>`);
    }
}

async function deleteStudent(req, res) {
    const id = req.params.id;
    try {
        const existingStudent = await models.tblstudents.findOne({ where: { id } });

        if (!existingStudent) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Student Does Not Exist!</div>");
        } else {
            await models.tblstudents.destroy({ where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Deleted Successfully!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

// session & term apis
async function getAllSessionTerms(req, res) {
    try {
        const result = await models.tblsessionterm.findAll({
            attributes: ['sessionName', 'isActive', 'createdAt'],
            include: [{
                model: models.tblterm,
                attributes: ['termName'],
                required: true
            }]
        });
        if (result) {
            res.status(200).send(result);
        } else {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred while fetching session & terms!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

async function getAllTerms(req, res) {
    try {
        const result = await models.tblterm.findAll({
            attributes: ['termName']
        });
        if (result) {
            res.status(200).send(result);
        } else {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred while fetching terms!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

async function createSession(req, res) {
    const { sessionName, termId } = req.body;
    try {
        const existingSession = await models.tblsessionterm.findOne({ where: { sessionName, termId } });

        if (existingSession) {
          res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Session & Term Already Exists!</div>");
        } else {
          await models.tblsessionterm.create({ sessionName, termId });
          res.send("<div className='alert alert-success'  style='margin-right:700px;'>Created Successfully!</div>");
        }
      } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
      }
}

async function editSession(req, res) {
    const id = req.params.id;
    const { sessionName, termId } = req.body;
    try {
        const existingSession = await models.tblsessionterm.findOne({ where: { id } });

        if (!existingSession) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Session Does Not Exist!</div>");
        } else {
            await models.tblsessionterm.update({ sessionName, termId }, { where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Updated Successfully!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error}</div>`);
    }
}

async function deleteSession(req, res) {
    const id = req.params.id;
    try {
        const existingSession = await models.tblstudents.findOne({ where: { id } });

        if (!existingSession) {
            res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Session Does Not Exist!</div>");
        } else {
            await models.tblsessionterm.destroy({ where: { id } });
            res.send("<div className='alert alert-success'  style='margin-right:700px;'>Deleted Successfully!</div>");
        }
    } catch (error) {
        res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error.message}</div>`);
    }
}

// async function toggleSession(req, res) {
//     const id = req.params.id;
//     const { isActive } = req.body;
//     try {
//         const existingSession = await models.tblsessionterm.findOne({ where: { id } });

//         if (!existingSession) {
//             res.send("<div className='alert alert-danger' style='margin-right:700px;'>This Session Does Not Exist!</div>");
//         } else {
//             await models.tblsessionterm.update({ sessionName, termId }, { where: { id } });
//             res.send("<div className='alert alert-success'  style='margin-right:700px;'>Updated Successfully!</div>");
//         }
//     } catch (error) {
//         res.send(`<div className='alert alert-danger' style='margin-right:700px;'>An error Occurred! Error: ${error}</div>`);
//     }
// }

module.exports = {
    dashboard,
    adminAuth,
    createClass,
    getAllClasses,
    editClass,
    deleteClass,
    getAllClassArms,
    createClassArm,
    editClassArm,
    deleteClassArm,
    getAllClassTeachers,
    createClassTeacher,
    getClassArmsByClass,
    editClassTeacher,
    deleteClassTeacher,
    getAllStudents,
    createStudent,
    editStudent,
    deleteStudent,
    getAllSessionTerms,
    getAllTerms,
    createSession,
    editSession,
    deleteSession
}