module.exports = (sequelize, DataTypes) => {
    const TbApplication = sequelize.define('TbApplication', {
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

    TbApplication.associate = (models) => {
        TbApplication.hasMany(models.TbGroup, {
            foreignKey: 'applicationId',
            as: 'groups',
            onDelete: 'CASCADE',
        });
    }

    return TbApplication;
}