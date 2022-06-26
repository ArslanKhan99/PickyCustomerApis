const {DataTypes} = require('sequelize');

const notificationModel = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        user_id: { type: DataTypes.INTEGER, allowNull: false},
        date_time: { type: DataTypes.STRING, allowNull: false},
        title: { type: DataTypes.STRING, allowNull: false},
        body: { type: DataTypes.TEXT, allowNull: false},
        notification_type: { type: DataTypes.STRING, allowNull: false},
        link_id: { type: DataTypes.INTEGER, allowNull: false},
        mark_as_read: { type: DataTypes.INTEGER, allowNull: true, defaultValue:0},
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    };

    return sequelize.define('notification', attributes, options);
}

module.exports = notificationModel;