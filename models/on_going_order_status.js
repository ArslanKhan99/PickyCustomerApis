const {DataTypes} = require('sequelize');


const onGoingOrderStatus = (sequelize) => {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,},
        order_id: { type: DataTypes.INTEGER, allowNull: false},
        status_title: { type: DataTypes.STRING,allowNull: false},
        description: { type: DataTypes.STRING, allowNull: false },
        time_stemp: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        freezeTableName: true,
        timestamps: false
    };

    return sequelize.define('ongoing_order_status', attributes, options);
}

module.exports = onGoingOrderStatus;