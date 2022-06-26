'use strict';
const {DataTypes} = require('sequelize');


const orderModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,},
        delivered_by: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
        seller_id: { type: DataTypes.INTEGER,allowNull: false},
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        sub_total: { type: DataTypes.DOUBLE, allowNull: false },
        delivery_charges: { type: DataTypes.DOUBLE, allowNull: false },
        coupon_id: { type: DataTypes.INTEGER, allowNull: false },
        coupon_price: { type: DataTypes.DOUBLE, allowNull: false },
        full_name: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        province: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        area: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.TEXT, allowNull: false },
        note: { type: DataTypes.TEXT, allowNull: true },
        payment_method: { type: DataTypes.STRING, allowNull: false },
        payment_status: { type: DataTypes.STRING, allowNull: false },
        paid_amount: { type: DataTypes.FLOAT, allowNull: false },
        transaction_no: { type: DataTypes.STRING, allowNull: false },
        ordered_at: { type: DataTypes.STRING, allowNull: false },
        expected_delivery: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };

    return sequelize.define('orders', attributes, options);
}

module.exports = orderModel;