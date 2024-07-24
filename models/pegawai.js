const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Pegawai', {
        idPegawai: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        namaPegawai: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'Pegawai'
    });
};