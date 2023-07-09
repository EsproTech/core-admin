module.exports = (sequelize, DataTypes) => {
    const NmCurrency = sequelize.define('NmCurrency', {
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
        code: {
            type:DataTypes.STRING,
            allowNull: false
        },
        active: {
            type:DataTypes.BOOLEAN,
            defaultValue: true
        },
        simbol: {
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

    NmCurrency.associate = (models) => {
        // Relación M a 1 con TbOrderSale
        NmCurrency.hasMany(models.TbOrderSale, {
            foreignKey: 'currencyId',
            as: 'ordersales',
            onDelete: 'CASCADE',
        });
    }

    return NmCurrency;
}