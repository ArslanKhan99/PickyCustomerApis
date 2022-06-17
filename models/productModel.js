'use strict';

const {DataTypes} = require('sequelize');


const productsModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        parent_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        seller_id: { type: DataTypes.INTEGER, allowNull: false},
        product_title: { type: DataTypes.TEXT, allowNull: false},
        category_id: { type: DataTypes.INTEGER, allowNull: false},
        sub_category_id: { type: DataTypes.INTEGER, allowNull: false},
        description: { type: DataTypes.TEXT, allowNull: false, defaultValue: "N/A"},
        full_description: { type: DataTypes.TEXT, allowNull: false, defaultValue: "N/A"},
        tags: { type: DataTypes.TEXT, allowNull: false, defaultValue: "N/A"},
        stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
        sold_quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
        price: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 1},
        sale_price: { type: DataTypes.DOUBLE, allowNull: true},
        is_on_sale: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0},
        sale_id: { type: DataTypes.TEXT, allowNull: false, defaultValue: 0},
        video_link: { type: DataTypes.TEXT, allowNull: false, defaultValue: "N/A"},
        sku: { type: DataTypes.TEXT, allowNull: false, defaultValue: "N/A"},
        unit: { type: DataTypes.TEXT, allowNull: false, defaultValue: "N/A"},
        unit_value: { type: DataTypes.TEXT, allowNull: false, defaultValue: "N/A"},
        brand: { type: DataTypes.TEXT, allowNull: false, defaultValue: "N/A"},
        delivery_apply_on: { type: DataTypes.INTEGER, allowNull: true},
        free_delivery_on: { type: DataTypes.INTEGER, allowNull: true},
        duration_type: { type: DataTypes.TEXT, allowNull: true},
        minimum_range: { type: DataTypes.TEXT, allowNull: true},
        maximum_range: { type: DataTypes.TEXT, allowNull: true},
        delivery_price: { type: DataTypes.FLOAT, allowNull: true},
        status: { type: DataTypes.TEXT, allowNull: false, defaultValue: "0"},
        color: { type: DataTypes.TEXT, allowNull: true},
        size: { type: DataTypes.TEXT, allowNull: true},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('products', attributes, options);
}

module.exports = productsModel;