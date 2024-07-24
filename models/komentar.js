const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Komentar', {
        idKomentar: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idTugas: {
            type: DataTypes.INTEGER,
            references: {
                model: 'TugasProyek', // Nama tabel harus sesuai dengan nama tabel di database
                key: 'idTugas'
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
        tanggalKomentar: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        isiKomentar: {
            type: DataTypes.TEXT,
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
        tableName: 'Komentar'
    });
};