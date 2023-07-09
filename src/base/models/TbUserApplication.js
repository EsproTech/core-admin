module.exports = (sequelize, DataTypes) => {
    const TbUserApplication = sequelize.define('TbUserApplication', {
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

    TbUserApplication.associate = (models) => {
        // Relación M a N con TbCompany
        models.TbApplication.belongsToMany(models.TbUser,
            {
                through: 'TbUserApplication',
                as: "users",
                foreignKey: "applicationId"
            }
        );
        // Relación N a M con TbApplication
        models.TbUser.belongsToMany(models.TbApplication,
            {
                through: 'TbUserApplication',
                as: "applications",
                foreignKey: "userId"
            }
        );
    }

    return TbUserApplication;
}