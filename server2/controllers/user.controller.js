const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res){
    models.tblstudents.findOne({where:{emailAddress: req.body.emailAddress}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exists!",
            });
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        admissionNumber: req.body.admissionNumber,
                        emailAddress:req.body.emailAddress,
                        password: hash,
                        phoneNo: req.body.phoneNo,
                        classId: req.body.classId,
                        classArmId: req.body.classArmId,
                    }
                    models.tblstudents.create(user).then(result => {
                        res.status(201).json({
                            message: "User created successfully",
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong!",
                            error: error
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}


function login(req, res){
    if(req.body.userType === 'Administrator') {
        models.tbladmin.findOne({where:{emailAddress: req.body.emailAddress}}).then(user => {
            if(user === null){
                res.status(401).json({
                    message: "Invalid credentials!",
                });
            }else{
                bcryptjs.compare(req.body.password, user.password, function(err, result){
                    if(result){
                        jwt.sign({
                            role: req.body.userType,
                            emailAddress: user.emailAddress,
                            userId: user.id
                        }, process.env.JWT_KEY, function(err, token){
                            if (err) {
                                console.error(err);
                                res.status(500).json({ message: "Error generating token" });
                            } else {
                                models.tbladmin.update({ tokens: token }, { where: { emailAddress: user.emailAddress } })
                                .then(() => {
                                    console.log("Token saved to database");
                                })
                                .catch((error) => {
                                    console.error("Error saving token to database: ", error);
                                });

                                res.cookie("jwtoken", token, {
                                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                                    httpOnly: true
                                });
                                res.status(200).json({
                                    message: "Authentication successful!",
                                });
                            }
                        });
                    }else{
                        res.status(401).json({
                            message: "Invalid credentials!",
                        });
                    }
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error
            });
        });
    } else if (req.body.userType === 'ClassTeacher') {
        models.tblclassteacher.findOne({where:{emailAddress: req.body.emailAddress}}).then(user => {
            if(user === null){
                res.status(401).json({
                    message: "Invalid credentials!",
                });
            }else{
                bcryptjs.compare(req.body.password, user.password, function(err, result){
                    if(result){
                        jwt.sign({
                            role: req.body.userType,
                            emailAddress: user.emailAddress,
                            userId: user.id
                        }, process.env.JWT_KEY, function(err, token){
                            if (err) {
                                console.error(err);
                                res.status(500).json({ message: "Error generating token" });
                            } else {
                                console.log(token);

                                models.tblclassteacher.update({ tokens: token }, { where: { emailAddress: user.emailAddress } })
                                .then(() => {
                                    console.log("Token saved to database");
                                })
                                .catch((error) => {
                                    console.error("Error saving token to database: ", error);
                                });

                                res.cookie("jwtoken", token, {
                                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                                    httpOnly: true
                                });
                                res.status(200).json({
                                    message: "Authentication successful!",
                                    token: token
                                });
                            }
                        });
                    }else{
                        res.status(401).json({
                            message: "Invalid credentials!",
                        });
                    }
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error
            });
        });
    } else if (req.body.userType === 'Student') {
        models.tblstudents.findOne({where:{emailAddress: req.body.emailAddress}}).then(user => {
            if(user === null){
                res.status(401).json({
                    message: "Invalid credentials!",
                });
            }else{
                bcryptjs.compare(req.body.password, user.password, function(err, result){
                    if(result){
                        jwt.sign({
                            role: req.body.userType,
                            emailAddress: user.emailAddress,
                            userId: user.id
                        }, process.env.JWT_KEY, function(err, token){
                            if (err) {
                                console.error(err);
                                res.status(500).json({ message: "Error generating token" });
                            } else {
                                console.log(token);

                                models.tblstudents.update({ tokens: token }, { where: { emailAddress: user.emailAddress } })
                                .then(() => {
                                    console.log("Token saved to database");
                                })
                                .catch((error) => {
                                    console.error("Error saving token to database: ", error);
                                });

                                res.cookie("jwtoken", token, {
                                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                                    httpOnly: true
                                });
                                res.status(200).json({
                                    message: "Authentication successful!",
                                    token: token
                                });
                            }
                        });
                    }else{
                        res.status(401).json({
                            message: "Invalid credentials!",
                        });
                    }
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error
            });
        });
    }
}

function logout(req, res) {
    try {
        res.clearCookie("jwtoken");
        res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while logging out",
            error: error.toString()
        });
    }
}

module.exports = {
    signUp,
    login,
    logout
}