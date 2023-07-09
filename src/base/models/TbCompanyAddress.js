module.exports = (sequelize, DataTypes) => {
    const TbCompanyAddress = sequelize.define('TbCompanyAddress', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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

    TbCompanyAddress.associate = (models) => {
        // Relación M a N con TbAddress
        models.TbCompany.belongsToMany(models.TbAddress,
            {
                through: 'TbCompanyAddress',
                as: "addresscompany",
                foreignKey: "companyId"
            }
        );
        // Relación N a M con TbCompany
        models.TbAddress.belongsToMany(models.TbCompany,
            {
                through: 'TbCompanyAddress',
                as: "companiessaddress",
                foreignKey: "addressId"
            }
        );
    }

    return TbCompanyAddress;
}