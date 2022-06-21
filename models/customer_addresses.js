'use strict';
const {DataTypes} = require('sequelize');


const customer_addresses = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,},
        created_at: { type: DataTypes.DATE, allowNull: true},
        updated_at: { type: DataTypes.DATE, allowNull: true},
        user_id: { type: DataTypes.INTEGER, allowNull: false},
        title: { type: DataTypes.STRING, allowNull: false ,defaultValue: "Default"},
        full_name: { type: DataTypes.STRING, allowNull: false ,defaultValue: "Default"},
        mobile: { type: DataTypes.STRING, allowNull: false ,defaultValue: "Default"},
        province: { type: DataTypes.STRING, allowNull: false ,defaultValue: "Default"},
        city: { type: DataTypes.STRING, allowNull: false ,defaultValue: "Default"},
        area: { type: DataTypes.STRING, allowNull: false ,defaultValue: "Default"},
        address: { type: DataTypes.STRING, allowNull: false},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('customer_addresses', attributes, options);
}

module.exports = customer_addresses;