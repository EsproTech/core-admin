module.exports = (sequelize, DataTypes) => {
    const NmCountry = sequelize.define('NmCountry', {
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

    NmCountry.associate = (models) => {
        // Relación 1 a M con NmState
        NmCountry.hasMany(models.NmState, {
            foreignKey: 'countryId',
            as: 'states',
        });

        NmCountry.hasMany(models.TbAddress, {
            foreignKey: 'countryId',
            as: 'caddress',
        });
    }

    return NmCountry;
}