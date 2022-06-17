'use strict';
const {DataTypes} = require('sequelize');

const reviewModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
        seller_id: { type: DataTypes.INTEGER,allowNull: false},
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        date_time: { type: DataTypes.STRING, allowNull: false },
        rating: { type: DataTypes.DOUBLE, allowNull: false },
        review: { type: DataTypes.STRING, allowNull: false },
        images: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('product_reviews', attributes, options);
}

module.exports = reviewModel;