module.exports = (sequelize, DataTypes) => {
    const NmUnitMeasurement = sequelize.define('NmUnitMeasurement', {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        name: {
            type:DataTypes.STRING,
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

    NmUnitMeasurement.associate = (models) => {
        // Relación 1 a M con TbProduct
        NmUnitMeasurement.hasMany(models.TbProduct, {
            foreignKey: 'unitId',
        });
    }

    return NmUnitMeasurement;
}