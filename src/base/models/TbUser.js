module.exports = (sequelize, DataTypes) => {
    const TbUser = sequelize.define('TbUser', {
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
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'this_email_address_is_already_in_use'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notificationToken: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        mobile: {
            type: DataTypes.STRING
        },
        landline: {
            type: DataTypes.STRING
        },
        isSuperAdmin: {
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


    TbUser.associate = (models) => {
        TbUser.hasMany(models.TbOrderSale, {
            foreignKey: 'userId',
            as: 'userorders'
        });
    }

    return TbUser;
}