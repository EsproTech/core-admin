
module.exports = (sequelize, DataTypes) => {
    const TbOrderSale = sequelize.define('TbOrderSale', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'CREATED'
        },
        nroOrder: {
            type: DataTypes.STRING
        },
        deadline: {
            type: DataTypes.DATE
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT
        },
        message: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.DATE
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.DATE
        },
        deleteAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    TbOrderSale.associate = (models) => {
        // Relación M a 1 con TbCompany
        TbOrderSale.belongsTo(models.TbCompany, {
            foreignKey: 'companyId',
            as: 'companies',
            onDelete: 'CASCADE',
        });

        TbOrderSale.hasMany(models.TbLineOrderSale, {
            foreignKey: 'orderSaleId',
            as: 'lineorders'
        });

        TbOrderSale.belongsTo(models.TbCustomer, {
            foreignKey: 'customerId',
            as: 'customer',
            onDelete: 'CASCADE'
        })

        TbOrderSale.belongsTo(models.NmCurrency, {
            foreignKey: 'currencyId',
            as: 'currency',
            onDelete: 'CASCADE'
        })

        TbOrderSale.belongsTo(models.TbUser, {
            foreignKey: 'userId',
            as: 'userordersale',
            onDelete: 'CASCADE'
        })
    }

    return TbOrderSale;
}