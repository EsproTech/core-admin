module.exports = (sequelize, DataTypes) => {
    const TbCustomer = sequelize.define('TbCustomer', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        isClient: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        locked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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

    TbCustomer.associate = (models) => {
        // Relación M a 1 con TbCompany
        TbCustomer.belongsTo(models.TbCompany, {
            foreignKey: 'companyId',
            as: 'companies',
            onDelete: 'CASCADE',
        });

        TbCustomer.hasMany(models.TbOrderSale, {
            foreignKey: 'customerId'
        });
    }

    return TbCustomer;
}