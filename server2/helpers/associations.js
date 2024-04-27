const models = require('../models');

models.tblclass.hasMany(models.tblclassarms, { foreignKey: 'classId' });
models.tblclassarms.belongsTo(models.tblclass, { foreignKey: 'classId' });

models.tblclass.hasMany(models.tblclassteacher, {foreignKey: 'classId'});
models.tblclassteacher.belongsTo(models.tblclass, { foreignKey: 'classId' });

models.tblclassarms.hasMany(models.tblclassteacher, {foreignKey: 'classArmId'});
models.tblclassteacher.belongsTo(models.tblclassarms, { foreignKey: 'classArmId' });

models.tblsubject.hasMany(models.tblclassteacher, {foreignKey: 'subjId'});
models.tblclassteacher.belongsTo(models.tblsubject, { foreignKey: 'subjId' });

models.tblclass.hasMany(models.tblsubjteacher, {foreignKey: 'classId'});
models.tblsubjteacher.belongsTo(models.tblclass, { foreignKey: 'classId' });

models.tblclassarms.hasMany(models.tblsubjteacher, {foreignKey: 'classArmId'});
models.tblsubjteacher.belongsTo(models.tblclassarms, { foreignKey: 'classArmId' });

models.tblsubject.hasMany(models.tblsubjteacher, {foreignKey: 'subjId'});
models.tblsubjteacher.belongsTo(models.tblsubject, { foreignKey: 'subjId' });

models.tblterm.hasMany(models.tblsessionterm, {foreignKey: 'termId'});
models.tblsessionterm.belongsTo(models.tblterm, { foreignKey: 'termId' });

models.tblclass.hasMany(models.tblstudents, {foreignKey: 'classId'});
models.tblstudents.belongsTo(models.tblclass, { foreignKey: 'classId' });

models.tblclassarms.hasMany(models.tblstudents, {foreignKey: 'classArmId'});
models.tblstudents.belongsTo(models.tblclassarms, { foreignKey: 'classArmId' });

models.tblclass.hasMany(models.tblattendance, {foreignKey: 'classId'});
models.tblattendance.belongsTo(models.tblclass, { foreignKey: 'classId' });

models.tblclassarms.hasMany(models.tblattendance, {foreignKey: 'classArmId'});
models.tblattendance.belongsTo(models.tblclassarms, { foreignKey: 'classArmId' });

models.tblsessionterm.hasMany(models.tblattendance, {foreignKey: 'sessionTermId'});
models.tblattendance.belongsTo(models.tblsessionterm, { foreignKey: 'sessionTermId' });

models.tblstudents.hasMany(models.tblattendance, { foreignKey: 'admissionNumber' });
models.tblattendance.belongsTo(models.tblstudents, { foreignKey: 'admissionNumber' });

models.tblsubject.hasMany(models.tblattendance, {foreignKey: 'subjId'});
models.tblattendance.belongsTo(models.tblsubject, { foreignKey: 'subjId' });

