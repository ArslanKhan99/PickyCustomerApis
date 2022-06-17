'use strict';

const {DataTypes} = require('sequelize');


const product_specs = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
        spec_title: { type: DataTypes.TEXT, allowNull: false},
        spec_description: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('product_specs', attributes, options);
}

module.exports = product_specs;