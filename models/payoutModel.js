'use strict';

const {DataTypes} = require('sequelize');


const payoutModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        seller_id: { type: DataTypes.INTEGER, allowNull: false},
        date_time: { type: DataTypes.TEXT, allowNull: false},
        amount: { type: DataTypes.DOUBLE, allowNull: false},
        image: { type: DataTypes.TEXT, allowNull: true},
        payment_type: { type: DataTypes.TEXT, allowNull: false},
        account_no: { type: DataTypes.TEXT, allowNull: true},
        account_title: { type: DataTypes.TEXT, allowNull: true}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('vendor_payouts', attributes, options);
}

module.exports = payoutModel;