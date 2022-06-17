'use strict';

const {DataTypes} = require('sequelize');


const product_colors = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
        color_id: { type: DataTypes.INTEGER, allowNull: false},
        color: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('product_colors', attributes, options);
}

module.exports = product_colors;