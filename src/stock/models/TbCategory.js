module.exports = (sequelize, DataTypes) => {
    const TbCategory = sequelize.define('TbCategory', {
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

    TbCategory.associate = (models) => {
        // Una categoria puede tener varias categorias hijas
        TbCategory.belongsTo(TbCategory, { as: 'parentCategory', foreignKey: 'parentId' });

        // Relación 1 a M con TbProduct
        TbCategory.hasMany(models.TbProduct, {
            foreignKey: 'categoryId',
        });

        // Relación M a 1 con TbCompany
        TbCategory.belongsTo(models.TbCompany, {
            foreignKey: 'companyId',
            as: 'companies',
            onDelete: 'CASCADE',
        });
    }

    TbCategory.beforeCreate(async (category, options) => {
        if (!category.companyId) {
          throw new Error('companyId is required');
        }
    });

    return TbCategory;
}