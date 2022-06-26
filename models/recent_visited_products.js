const {DataTypes} = require('sequelize');

const recent_visited_products = (sequelize) => {
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

    return sequelize.define('recent_visited_products', attributes, options);
}

module.exports = recent_visited_products;