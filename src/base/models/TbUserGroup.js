module.exports = (sequelize, DataTypes) => {
    const TbUserGroup = sequelize.define('TbUserGroup', {
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

    TbUserGroup.associate = (models) => {
        // Relación M a N con TbCompany
        models.TbGroup.belongsToMany(models.TbUser,
            {
                through: 'TbUserGroup',
                as: "users",
                foreignKey: "groupId"
            }
        );
        // Relación N a M con TbApplication
        models.TbUser.belongsToMany(models.TbGroup,
            {
                through: 'TbUserGroup',
                as: "groups",
                foreignKey: "userId"
            }
        );
    }

    return TbUserGroup;
}