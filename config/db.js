const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql-26f6774d-miumg-96e0.f.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_pjw6sbLUfqaRpCza2cQ',
  database: 'salon',
  port:'13408'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;