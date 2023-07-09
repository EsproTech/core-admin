module.exports = (sequelize, DataTypes) => {
    const NmNotification = sequelize.define('NmNotification', {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        title:{
            type:DataTypes.STRING,
            allowNull: false
        },
        description:{
            type:DataTypes.STRING,
            allowNull: false
        },
        extraData:{
            type:DataTypes.JSON,
            allowNull: false
        },
        createdAt:{
            type:DataTypes.DATE,
            defaultValue: sequelize.DATE
        },
        updatedAt:{
            type:DataTypes.DATE,
            defaultValue: sequelize.DATE
        },
        deleteAt:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        timestamps:false,
        freezeTableName: true
    });

    return NmNotification;
}