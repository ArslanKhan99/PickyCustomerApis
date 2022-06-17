'use strict';
const {DataTypes} = require('sequelize');


const deliveryAreaModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        vendor_id: { type: DataTypes.INTEGER, allowNull: false},
        areas: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('vendor_delivery_areas', attributes, options);
}

module.exports = deliveryAreaModel;