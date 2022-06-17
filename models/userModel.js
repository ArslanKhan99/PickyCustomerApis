'use strict';

const {DataTypes} = require('sequelize');


const model = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,},
        createdAt: { type: DataTypes.DATE,field: 'created_at'},
        updatedAt: { type: DataTypes.DATE,field: 'created_at'},
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        whatsapp: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: false },
        shop_name: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.TEXT, allowNull: false },
        division: { type: DataTypes.STRING, allowNull: false },
        district: { type: DataTypes.STRING, allowNull: false },
        area: { type: DataTypes.STRING, allowNull: true },
        latitude: { type: DataTypes.DOUBLE, allowNull: true },
        logo: { type: DataTypes.STRING, allowNull: false },
        banner: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'approved'},
        token: { type: DataTypes.STRING, allowNull: true },
        product_type: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        freezeTableName: true,
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('vendor', attributes, options);
}

module.exports = model;