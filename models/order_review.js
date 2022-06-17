const {DataTypes} = require('sequelize');


const order_reviews = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        user_id: { type: DataTypes.INTEGER, allowNull: false},
        order_id: { type: DataTypes.INTEGER, allowNull: false},
        vendor_id: { type: DataTypes.INTEGER, allowNull: false},
        rating: { type: DataTypes.DOUBLE, allowNull: false},
        comment: { type: DataTypes.TEXT, allowNull: false},
        images: { type: DataTypes.TEXT, allowNull: true},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('order_reviews', attributes, options);
}

module.exports = order_reviews;