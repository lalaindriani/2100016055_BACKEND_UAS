const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Proyek', {
        idProyek: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        namaProyek: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deskripsiProyek: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
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
        tableName: 'Proyek'
    });
};