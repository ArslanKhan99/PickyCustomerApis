const {DataTypes} = require('sequelize');


const clamed_promo_codes = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        user_id: { type: DataTypes.INTEGER, allowNull: false},
        promo_id: { type: DataTypes.INTEGER, allowNull: false},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('clamed_promo_codes', attributes, options);
}

module.exports = clamed_promo_codes;