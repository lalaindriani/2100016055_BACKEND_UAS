const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('TugasProyek', {
        idTugas: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idProyek: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Proyek', // Nama tabel harus sesuai dengan nama tabel di database
                key: 'idProyek'
            },
            allowNull: false
        },
        idPegawai: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Pegawai', // Nama tabel harus sesuai dengan nama tabel di database
                key: 'idPegawai'
            },
            allowNull: false
        },
        namaTugas: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deskripsiTugas: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
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
        tableName: 'TugasProyek'
    });
};
