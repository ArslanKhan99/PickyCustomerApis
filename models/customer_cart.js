const {DataTypes} = require('sequelize');


const customer_cart = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,},
        user_id: { type: DataTypes.INTEGER, allowNull: false},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
        quantity: { type: DataTypes.INTEGER, allowNull: false},
        color: { type: DataTypes.STRING, allowNull: true ,defaultValue: "Default"},
        size: { type: DataTypes.STRING, allowNull: true ,defaultValue: "Default"},
        addons: { type: DataTypes.STRING, allowNull: true ,defaultValue: "Default"},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('customer_cart', attributes, options);
}

module.exports = customer_cart;