const {DataTypes} = require('sequelize');


const sub_categories = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,},
        created_at: { type: DataTypes.TIME, allowNull: true},
        updated_at: { type: DataTypes.TIME, allowNull: true},
        category_id: { type: DataTypes.TEXT, allowNull: false},
        title: { type: DataTypes.STRING, allowNull: false},
        image: { type: DataTypes.STRING, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('sub_categories', attributes, options);
}

module.exports = sub_categories;