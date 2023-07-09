module.exports = (sequelize, DataTypes) => {
    const TbUserAddress = sequelize.define('TbUserAddress', {
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

    TbUserAddress.associate = (models) => {
        // Relación M a N con TbAddress
        models.TbUser.belongsToMany(models.TbAddress,
            {
                through: 'TbUserAddress',
                as: "address",
                foreignKey: "userId"
            }
        );
        // Relación N a M con TbUser
        models.TbAddress.belongsToMany(models.TbUser,
            {
                through: 'TbUserAddress',
                as: "users",
                foreignKey: "addressId"
            }
        );
    }

    return TbUserAddress;
}