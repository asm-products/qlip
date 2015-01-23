"use strict";

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        fullname: DataTypes.STRING(255),
        avatar: DataTypes.STRING(512),
        provider: DataTypes.STRING(255),
        email: DataTypes.STRING(255)
    });

    return User;
};