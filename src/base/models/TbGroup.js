module.exports = (sequelize, DataTypes) => {
    const TbGroup = sequelize.define('TbGroup', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,            
            allowNull: false,
            defaultValue: sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING
        },
        code: {
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

    TbGroup.associate = (models) => {
        // Relación M a 1 con TbApplication
        TbGroup.belongsTo(models.TbApplication, {
            foreignKey: 'applicationId',
            as: 'applications',
            onDelete: 'CASCADE',
        });
    }

    return TbGroup;
}