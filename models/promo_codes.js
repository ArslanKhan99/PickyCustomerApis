const {DataTypes} = require('sequelize');


const promo_codes = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        description: { type: DataTypes.TEXT, allowNull: false, defaultValue:"No description"},
        promo_type: { type: DataTypes.STRING, allowNull: false, defaultValue: "first order"},
        code: { type: DataTypes.STRING, allowNull: false, defaultValue: "0"},
        discount: { type: DataTypes.DOUBLE, allowNull: false, defaultValue:0},
        discount_type: { type: DataTypes.STRING, allowNull: false, defaultValue: "percentage"},
        valid_before: { type: DataTypes.STRING, allowNull: false},
        image: { type: DataTypes.STRING, allowNull: false},
        is_for_first_order: { type: DataTypes.STRING, allowNull: false, defaultValue:"0"},
        registered_in_month: { type: DataTypes.STRING, allowNull: false, defaultValue:"0"},
        registered_in_year: { type: DataTypes.STRING, allowNull: false, defaultValue:"0"},
        for_vendor_ids: { type: DataTypes.TEXT, allowNull: false, defaultValue:"0"},
        minimum_bill: { type: DataTypes.STRING, allowNull: false, defaultValue:"0"},
        status: { type: DataTypes.STRING, allowNull: false, defaultValue:"live"},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('promo_codes', attributes, options);
}

module.exports = promo_codes;