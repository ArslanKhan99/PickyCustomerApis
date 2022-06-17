const {DataTypes} = require('sequelize');


const product_reviews = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        product_id: { type: DataTypes.INTEGER, allowNull: false},
        seller_id: { type: DataTypes.INTEGER, allowNull: false},
        user_id: { type: DataTypes.INTEGER, allowNull: false},
        date_time: { type: DataTypes.TEXT, allowNull: false},
        rating: { type: DataTypes.DOUBLE, allowNull: false},
        review: { type: DataTypes.TEXT, allowNull: false},
        images: { type: DataTypes.TEXT, allowNull: true},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('product_reviews', attributes, options);
}

module.exports = product_reviews;