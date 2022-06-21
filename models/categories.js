const {DataTypes} = require('sequelize');


const categories = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,},
        created_at: { type: DataTypes.TIME, allowNull: true},
        updated_at: { type: DataTypes.TIME, allowNull: true},
        title: { type: DataTypes.STRING, allowNull: false},
        image: { type: DataTypes.STRING, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('categories', attributes, options);
}

module.exports = categories;