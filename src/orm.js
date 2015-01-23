var models = require('./models')
    ;

models.sequelize.sync().then(function () {
    console.log('Qlip database is ready to be used.');
});

module.exports = models;