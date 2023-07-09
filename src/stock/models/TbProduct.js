module.exports = (sequelize, DataTypes) => {
    const TbProduct = sequelize.define('TbProduct', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        },
        costPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        salePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        minimalExistence: {
            type: DataTypes.INTEGER
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

        TbProduct.hasMany(models.TbLineOrderSale, {
            foreignKey: 'productId'
        })
    }

    return TbProduct;
}