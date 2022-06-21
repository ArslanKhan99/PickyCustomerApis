'use strict';
const {DataTypes} = require('sequelize');


const customer_points = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,},
        user_id: { type: DataTypes.INTEGER, allowNull: false},
        description: { type: DataTypes.STRING, allowNull: false ,defaultValue: "Default"},
        points: { type: DataTypes.FLOAT, allowNull: false , defaultValue: 0},
        timestamp: { type: DataTypes.STRING, allowNull: false},
        type: { type: DataTypes.STRING, allowNull: false},
        link_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('earn_points', attributes, options);
}

module.exports = customer_points;