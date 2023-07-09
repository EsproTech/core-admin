module.exports = (sequelize, DataTypes) => {
    const TbCompanyUser = sequelize.define('TbCompanyUser', {
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

    TbCompanyUser.associate = (models) => {
        // Relación M a N con TbCompany
        models.TbUser.belongsToMany(models.TbCompany,
            {
                through: 'TbCompanyUser',
                as: "companies",
                foreignKey: "userId"
            }
        );
        // Relación N a M con TbUser
        models.TbCompany.belongsToMany(models.TbUser,
            {
                through: 'TbCompanyUser',
                as: "users",
                foreignKey: "companyId"
            }
        );
    }

    return TbCompanyUser;
}