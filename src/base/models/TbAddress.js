module.exports = (sequelize, DataTypes) => {
    const TbAddress = sequelize.define('TbAddress', {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        postalCode:{
            type:DataTypes.STRING
        },
        nroHouse: {
            type:DataTypes.STRING
        },
        street: {
            type:DataTypes.STRING,
            allowNull: false
        },
        description:{
            type:DataTypes.TEXT
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

    TbAddress.associate = (models) => {
        // Relación 1 a M con TbCompany
        TbAddress.hasMany(models.TbCompany, {
            foreignKey: 'addressId'
        });

        // Relación M a 1 con NmCountry
        TbAddress.belongsTo(models.NmCountry, {
            foreignKey: 'countryId',
            as: 'country',
            onDelete: 'CASCADE',
        });

        // Relación M a 1 con NmState
        TbAddress.belongsTo(models.NmState, {
            foreignKey: 'stateId',
            as: 'state',
            onDelete: 'CASCADE',
        });

    }

    return TbAddress;
}