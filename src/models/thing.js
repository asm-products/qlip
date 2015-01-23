"use strict";

module.exports = function(sequelize, DataTypes) {

    var Thing = sequelize.define("Thing", {
        nickname: DataTypes.STRING(255),
        user: DataTypes.STRING(255),
        product: DataTypes.STRING(255),
        config: DataTypes.TEXT
    });

    return Thing;
};