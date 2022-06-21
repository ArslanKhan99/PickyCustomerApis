const {DataTypes} = require('sequelize');


const colorsModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        color_value: { type: DataTypes.STRING, allowNull: false},
        color_type: { type: DataTypes.STRING, allowNull: false},
        category_ids: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('colors', attributes, options);
}

module.exports = colorsModel;