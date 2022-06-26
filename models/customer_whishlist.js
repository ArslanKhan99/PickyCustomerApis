const {DataTypes} = require('sequelize');

const customer_whishlist = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        user_id: { type: DataTypes.INTEGER, allowNull: false},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('customer_whishlist', attributes, options);
}

module.exports = customer_whishlist;