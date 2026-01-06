const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

db.getConnection((err, conn) => {
  if (err) {
    console.error('❌ MySQL Error:', err.message);
  } else {
    console.log('✅ MySQL Connected');
    conn.release();
  }
});

module.exports = db;
