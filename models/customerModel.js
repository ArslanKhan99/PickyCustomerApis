'use strict';
const {DataTypes} = require('sequelize');


const customerModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,},
        created_at: { type: DataTypes.DATE},
        updated_at: { type: DataTypes.DATE},
        referal_code: { type: DataTypes.STRING, allowNull: false},
        refer_by_customer: { type: DataTypes.INTEGER, allowNull: false, defaultValue: "0"},
        first_name: { type: DataTypes.STRING, allowNull: false ,defaultValue: "No Name"},
        last_name: { type: DataTypes.STRING, allowNull: false , defaultValue: "No Name"},
        email: { type: DataTypes.STRING, allowNull: true},
        phone: { type: DataTypes.STRING, allowNull: true},
        apple_id: { type: DataTypes.STRING, allowNull: true},
        password: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
        user_name: { type: DataTypes.STRING, allowNull: true},
        default_address_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
        points: { type: DataTypes.STRING, allowNull: false, defaultValue: 0},
        image: { type: DataTypes.STRING, allowNull: false , defaultValue: "placeholder.jpg"},
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'approved'},
        token: { type: DataTypes.STRING, allowNull: true }
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['password'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('customers', attributes, options);
}

module.exports = customerModel;