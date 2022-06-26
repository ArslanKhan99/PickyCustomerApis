const {DataTypes} = require('sequelize');

const salesModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        title: { type: DataTypes.STRING, allowNull: false},
        description: { type: DataTypes.TEXT, allowNull: false},
        from_date: { type: DataTypes.STRING, allowNull: false},
        to_date: { type: DataTypes.STRING, allowNull: false},
        image: { type: DataTypes.STRING, allowNull: false},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('sales', attributes, options);
}

module.exports = salesModel;