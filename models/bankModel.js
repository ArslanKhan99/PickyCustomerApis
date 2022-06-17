'use strict';

const {DataTypes} = require('sequelize');

const bankModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        vendor_id: { type: DataTypes.INTEGER, allowNull: false},
        ibn: { type: DataTypes.TEXT, allowNull: true},
        title: { type: DataTypes.TEXT, allowNull: false},
        account_no: { type: DataTypes.TEXT, allowNull: true},
        branch_code: { type: DataTypes.TEXT, allowNull: true},
        branch_address: { type: DataTypes.TEXT, allowNull: true},
        bank_name: { type: DataTypes.TEXT, allowNull: true},
        type: { type: DataTypes.TEXT, allowNull: true},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('vendor_bank', attributes, options);
}

module.exports = bankModel;