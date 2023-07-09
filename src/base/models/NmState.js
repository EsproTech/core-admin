module.exports = (sequelize, DataTypes) => {
    const NmState = sequelize.define('NmState', {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
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

    NmState.associate = (models) => {
        // Relación 1 a M con TbAddress
        NmState.hasMany(models.TbAddress, {
            foreignKey: 'stateId',
            as: 'saddress',
        });

        // Relación M a 1 con NmCountry
        NmState.belongsTo(models.NmCountry, {
            foreignKey: 'countryId',
            as: 'country',
            onDelete: 'CASCADE',
        });
    }

    return NmState;
}