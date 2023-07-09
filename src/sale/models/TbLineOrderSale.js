
module.exports = (sequelize, DataTypes) => {
    const TbLineOrderSale = sequelize.define('TbLineOrderSale', {
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT
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

    TbLineOrderSale.associate = (models) => {
        // Relación M a 1 con TbOrderSale
        TbLineOrderSale.belongsTo(models.TbOrderSale, {
            foreignKey: 'orderSaleId',
            as: 'ordersale',
            onDelete: 'CASCADE',
        });

        // Relación M a 1 con TbProduct
        TbLineOrderSale.belongsTo(models.TbProduct, {
            foreignKey: 'productId',
            as: 'produt',
            onDelete: 'CASCADE',
        });
    }

    return TbLineOrderSale;
}