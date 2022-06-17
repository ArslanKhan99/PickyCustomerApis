'use strict';

const {DataTypes} = require('sequelize');


const product_delivery_details = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
        box_weight: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'N/A'},
        box_width: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'N/A'},
        box_height: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'N/A'},
        box_length: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'N/A'},
        dangerous_goods: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'N/A'},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('product_delivery_details', attributes, options);
}

module.exports = product_delivery_details;