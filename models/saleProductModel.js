'use strict';
const {DataTypes} = require('sequelize');

const saleProductModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        sale_id: { type: DataTypes.INTEGER, allowNull: false},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('sale_products', attributes, options);
}

module.exports = saleProductModel;