module.exports = (sequelize, DataTypes) => {
    const TbProductWarehouse = sequelize.define('TbProductWarehouse', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        // Disponibilidad del producto
        availability: {
            type: DataTypes.INTEGER
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

    TbProductWarehouse.associate = (models) => {
        // Relación M a N con TbCompany
        models.TbProduct.belongsToMany(models.TbWarehouse,
            {
                through: 'TbProductWarehouse',
                as: "warehouses",
                foreignKey: "productId"
            }
        );
        // Relación N a M con TbApplication
        models.TbWarehouse.belongsToMany(models.TbProduct,
            {
                through: 'TbProductWarehouse',
                as: "products",
                foreignKey: "warehouseId"
            }
        );
    }

    TbProductWarehouse.beforeCreate(async (product_warehouse, options) => {
        if (product_warehouse.availability <= 0) {
          throw new Error('availability is takes values greater than zero');
        }
    });

    return TbProductWarehouse;
}