'use strict';

const {DataTypes} = require('sequelize');


const product_sizes = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
        size_id: { type: DataTypes.INTEGER, allowNull: false},
        size: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('product_sizes', attributes, options);
}

module.exports = product_sizes;