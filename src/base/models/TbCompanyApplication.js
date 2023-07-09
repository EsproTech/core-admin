module.exports = (sequelize, DataTypes) => {
    const TbCompanyApplication = sequelize.define('TbCompanyApplication', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
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

    TbCompanyApplication.associate = (models) => {
        // Relación M a N con TbCompany
        models.TbApplication.belongsToMany(models.TbCompany,
            {
                through: 'TbCompanyApplication',
                as: "companies",
                foreignKey: "applicationId"
            }
        );
        // Relación N a M con TbApplication
        models.TbCompany.belongsToMany(models.TbApplication,
            {
                through: 'TbCompanyApplication',
                as: "applications",
                foreignKey: "companyId"
            }
        );
    }

    return TbCompanyApplication;
}