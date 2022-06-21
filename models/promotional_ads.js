const {DataTypes} = require('sequelize');


const promotional_ads = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        created_at: { type: DataTypes.TIME, allowNull: true},
        updated_at: { type: DataTypes.TIME, allowNull: true},
        image: { type: DataTypes.TEXT, allowNull: false},
        link_id: { type: DataTypes.TEXT, allowNull: false},
        ad_type: { type: DataTypes.TEXT, allowNull: false},
        ad_place: { type: DataTypes.TEXT, allowNull: false}
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('promotional_ads', attributes, options);
}

module.exports = promotional_ads;