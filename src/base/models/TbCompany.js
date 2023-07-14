module.exports = (sequelize, DataTypes) => {
    const TbCompany = sequelize.define('TbCompany', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,            
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        code: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        mobile: {
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

    TbCompany.associate = (models) => {
        // Una TbCompany puede tener varias TbCompany hijas
        TbCompany.belongsTo(TbCompany, { as: 'parentCompany', foreignKey: 'parentId' });

        // Relación 1 a M con TbCategory
        TbCompany.hasMany(models.TbCategory, {
            foreignKey: 'companyId'
        });
        
        // Relación 1 a M con TbProduct
        TbCompany.hasMany(models.TbProduct, {
            foreignKey: 'companyId'
        });
        
        // Relación 1 a M con TbEmployee
        TbCompany.hasMany(models.TbEmployee, {
           foreignKey: 'companyId'
        })
        
        // Relación 1 a M con TbCustomer
        TbCompany.hasMany(models.TbCustomer, {
            foreignKey: 'companyId'
        })

        // Relación 1 a M con TbOrderSale
        TbCompany.hasMany(models.TbOrderSale, {
            foreignKey: 'companyId'
        })

        TbCompany.belongsTo(models.TbAddress, {
            foreignKey: 'addressId',
            as: 'address',
            onDelete: 'CASCADE'
        });
    }

    return TbCompany;
}