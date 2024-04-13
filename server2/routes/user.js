const express = require('express');
const userController = require('../controllers/user.controller');
const adminController = require('../controllers/user.admin.controller');
const teacherController = require('../controllers/user.classTeacher.controller');
const studentController = require('../controllers/user.student.controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);


// admin routes start
router.post('/admin/dashboard', checkAuth.CheckAdminAuth, adminController.dashboard);
router.post('/admin/authenticate', adminController.adminAuth);

//class routes
router.post('/admin/createClass', checkAuth.CheckAdminAuth, adminController.createClass);
router.get('/admin/getAllClasses', checkAuth.CheckAdminAuth, adminController.getAllClasses);
router.patch('/admin/editClass/:id', checkAuth.CheckAdminAuth, adminController.editClass);
router.delete('/admin/deleteClass/:id', checkAuth.CheckAdminAuth, adminController.deleteClass);

//classArms routes
router.get('/admin/getAllClassArms', checkAuth.CheckAdminAuth, adminController.getAllClassArms);
router.post('/admin/createClassArm', checkAuth.CheckAdminAuth, adminController.createClassArm);
router.patch('/admin/editClassArm/:id', checkAuth.CheckAdminAuth, adminController.editClassArm);
router.delete('/admin/deleteClassArm/:id', checkAuth.CheckAdminAuth, adminController.deleteClassArm);

//class teacher routes
router.get('/admin/getAllClassTeachers', checkAuth.CheckAdminAuth, adminController.getAllClassTeachers);
router.get('/admin/getAllSubjects', checkAuth.CheckAdminAuth, adminController.getAllSubjects);
router.post('/admin/createClassTeacher', checkAuth.CheckAdminAuth, adminController.createClassTeacher);
router.get('/admin/getClassArmsByClass', checkAuth.CheckAdminAuth, adminController.getClassArmsByClass);
router.patch('/admin/editClassTeacher/:id', checkAuth.CheckAdminAuth, adminController.editClassTeacher);
router.delete('/admin/deleteClassTeacher/:id', checkAuth.CheckAdminAuth, adminController.deleteClassTeacher);

//student routes
router.get('/admin/getAllStudents', checkAuth.CheckAdminAuth, adminController.getAllStudents);
router.post('/admin/createStudent', checkAuth.CheckAdminAuth, adminController.createStudent);
router.patch('/admin/editStudent/:id', checkAuth.CheckAdminAuth, adminController.editStudent);
router.delete('/admin/deleteStudent/:id', checkAuth.CheckAdminAuth, adminController.deleteStudent);

// session & term routes
router.get("/admin/getAllSessionTerms", checkAuth.CheckAdminAuth, adminController.getAllSessionTerms);
router.get("/admin/getAllTerms", checkAuth.CheckAdminAuth, adminController.getAllTerms);
router.post("/admin/createSession", checkAuth.CheckAdminAuth, adminController.createSession);
router.patch('/admin/editSession/:id', checkAuth.CheckAdminAuth, adminController.editSession);
router.delete('/admin/deleteSession/:id', checkAuth.CheckAdminAuth, adminController.deleteSession);
// router.post("/admin/toggleSession", adminController.toggleSession);

// admin routes end

// Class Teacher routes start

router.post('/classTeacher/authenticate', teacherController.teacherAuth);

router.post('/classTeacher/dashboard', checkAuth.CheckTeacherAuth, teacherController.dashboard);
router.get('/classTeacher/viewStudents', checkAuth.CheckTeacherAuth, teacherController.viewStudents);
router.post('/classTeacher/loadTakeAttendancePage', checkAuth.CheckTeacherAuth, teacherController.loadTakeAttendancePage);
router.patch('/classTeacher/takeAttendance', checkAuth.CheckTeacherAuth, teacherController.takeAttendance);
router.post('/classTeacher/viewClassAttendance', checkAuth.CheckTeacherAuth, teacherController.viewClassAttendance);
router.get('/classTeacher/getAllStudents', checkAuth.CheckTeacherAuth, teacherController.getAllStudents);
router.post('/classTeacher/viewStudentAttendance', checkAuth.CheckTeacherAuth, teacherController.viewStudentAttendance);

// class teacher routes end

// student routes start
router.post('/student/authenticate', studentController.studentAuth);
router.get('/student/viewAttendance', checkAuth.CheckStudentAuth, studentController.viewAttendance);
router.post('/student/dashboard', checkAuth.CheckStudentAuth, studentController.dashboard);

// student routes end

module.exports = router;