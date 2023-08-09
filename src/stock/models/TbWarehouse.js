module.exports = (sequelize, DataTypes) => {
    const TbWarehouse = sequelize.define('TbWarehouse', {
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
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        predetermined: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        phone: {
            type: DataTypes.STRING  
        },
        address:{
            type: DataTypes.STRING
        },        
        workHours: {
            type: DataTypes.STRING
        },
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

    TbWarehouse.associate = (models) => {
        // Relación 1 a M con TbProduct
        TbWarehouse.hasMany(models.TbProduct, {
            foreignKey: 'warehouseId',
        });

        // Relación M a 1 con TbCompany
        TbWarehouse.belongsTo(models.TbCompany, {
            foreignKey: 'companyId',
            as: 'storecompany',
            onDelete: 'CASCADE',
        });
    }

    TbWarehouse.beforeCreate(async (warehouse, options) => {
        if (!warehouse.companyId) {
          throw new Error('companyId is required');
        }
    });

    return TbWarehouse;
}