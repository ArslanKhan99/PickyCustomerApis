const {DataTypes} = require('sequelize');


const sizesModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        size_value: { type: DataTypes.STRING, allowNull: false},
        size_type: { type: DataTypes.STRING, allowNull: false},
        category_ids: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('sizes', attributes, options);
}

module.exports = sizesModel;