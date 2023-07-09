module.exports = (sequelize, DataTypes) => {
    const TbNotificationUser = sequelize.define('TbNotificationUser', {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        read:{
            type:DataTypes.BOOLEAN
        }
    },{
        timestamps:false,
        freezeTableName: true
    });

    TbNotificationUser.associate = (models) => {
        // Relación M a N con NmNotification
        models.TbUser.belongsToMany(models.NmNotification,
            { through: 'TbNotificationUser',
            as: "notifications",
            foreignKey: "userId"
        });
        // Relación N a M con TbUser
        models.NmNotification.belongsToMany(models.TbUser,
            { through: 'TbNotificationUser',
            as: "users",
            foreignKey: "notificationId"
        });
    }

    return TbNotificationUser
}