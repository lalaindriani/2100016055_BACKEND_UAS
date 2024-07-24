const { Sequelize } = require('sequelize');

require("dotenv").config(); // Load environment variables

const serviceUri = process.env.DB_URI;

const sequelize = new Sequelize(serviceUri, {
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
});


// Konfigurasi koneksi Sequelize
// const sequelize = new Sequelize('project_backend', 'root', '', {
//  host: 'localhost',
//  dialect: 'mysql'
// });

const Pegawai = require('./pegawai')(sequelize);
const Proyek = require('./proyek')(sequelize);
const TugasProyek = require('./tugasProyek')(sequelize);
const Komentar = require('./komentar')(sequelize);

// Define associations
Pegawai.hasMany(TugasProyek, { foreignKey: 'idPegawai' });
TugasProyek.belongsTo(Pegawai, { foreignKey: 'idPegawai' });

Proyek.hasMany(TugasProyek, { foreignKey: 'idProyek' });
TugasProyek.belongsTo(Proyek, { foreignKey: 'idProyek' });

TugasProyek.hasMany(Komentar, { foreignKey: 'idTugas' });
Komentar.belongsTo(TugasProyek, { foreignKey: 'idTugas' });

Pegawai.hasMany(Komentar, { foreignKey: 'idPegawai' });
Komentar.belongsTo(Pegawai, { foreignKey: 'idPegawai' });

// Sinkronkan model dengan database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = {
  sequelize,
  Pegawai,
  Proyek,
  TugasProyek,
  Komentar,
};
