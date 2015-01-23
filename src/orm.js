var models = require('./models')
    ;

models.sequelize.sync().then(function () {
    console.log('Qlip database is ready to be used.');
}, function (error) {
    console.error(error);
    process.exit(1);
});

module.exports = models;