const cron = require('node-cron');
const db = require('../config/db');

cron.schedule('*/5 * * * *', () => {
  db.query(
    `SELECT * FROM bookings WHERE status='BOOKED'
     AND start_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 15 MINUTE)`,
    () => {}
  );
});
