'use strict';

const {DataTypes} = require('sequelize');


const product_addon = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
        adon_price: { type: DataTypes.DOUBLE, allowNull: false},
        adon_description: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('product_adons', attributes, options);
}

module.exports = product_addon;