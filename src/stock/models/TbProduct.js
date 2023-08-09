module.exports = (sequelize, DataTypes) => {
    const TbProduct = sequelize.define('TbProduct', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        image: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Tipo de productos
        typeProduct: {
            type: DataTypes.ENUM("Producto", "Servicio"),
            allowNull: false,
            defaultValue: "Producto",
        },
        // Còdigo de barra
        bardcode: {
            type: DataTypes.STRING
        },
        // Costo del producto
        costPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        // Precio de venta
        salePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        // Existencia mìnima del producto
        minimalExistence: {
            type: DataTypes.INTEGER
        },
        // Visibilidad del producto. Si es Pública entonces estarà disponible
        // tambièn para la venta online
        visibility: {
            type: DataTypes.ENUM("Privado", "Público"),
            allowNull: false,
            defaultValue: "Privado",
        },
        // Descripciòn del productos
        description: {
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

    TbProduct.associate = (models) => {
        // Relación M a 1 con TbCategory
        TbProduct.belongsTo(models.TbCategory, {
            foreignKey: 'categoryId',
            as: 'categories',
            onDelete: 'CASCADE',
        });

        TbProduct.belongsTo(models.TbCompany, {
            foreignKey: 'companyId',
            as: 'companies',
            onDelete: 'CASCADE',
        });

        // Relación M a 1 con TbCategory
        TbProduct.belongsTo(models.NmUnitMeasurement, {
            foreignKey: 'unitId',
            as: 'unities',
            onDelete: 'CASCADE',
        });

        TbProduct.hasMany(models.TbLineOrderSale, {
            foreignKey: 'productId'
        })
    }

    return TbProduct;
}