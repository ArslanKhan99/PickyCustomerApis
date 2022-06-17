'use strict';
const {DataTypes} = require('sequelize');


const orderDetailModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,},
        order_id: { type: DataTypes.INTEGER, allowNull: false},
        product_id: { type: DataTypes.INTEGER,allowNull: false},
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DOUBLE, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        addons: { type: DataTypes.TEXT, allowNull: false },
        addon_prices: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };

    return sequelize.define('order_details', attributes, options);
}

module.exports = orderDetailModel;