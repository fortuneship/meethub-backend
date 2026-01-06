const db = require('../config/db');
const { sendEmail } = require('../utils/mailer');

exports.createBooking = (req, res) => {
  const { title, start_time, end_time } = req.body;

  db.query(
    `SELECT id FROM bookings 
     WHERE status='BOOKED' AND (start_time < ? AND end_time > ?)`,
    [end_time, start_time],
    (err, r) => {
      if (r.length) return res.status(409).json({ message: 'Time booked' });

      db.query(
        'INSERT INTO bookings (user_id,title,start_time,end_time) VALUES (?,?,?,?)',
        [req.user.id, title, start_time, end_time],
        () => res.status(201).json({ message: 'Booking created' })
      );
    }
  );
};

exports.getBookings = (req, res) => {
  const sql =
    req.user.role === 'ADMIN'
      ? `SELECT b.*,u.name booked_by FROM bookings b JOIN users u ON u.id=b.user_id`
      : `SELECT * FROM bookings WHERE user_id=?`;

  db.query(sql, req.user.role === 'ADMIN' ? [] : [req.user.id], (err, r) =>
    res.json(r)
  );
};

exports.cancelBooking = (req, res) => {
  db.query(
    'UPDATE bookings SET status="CANCELLED" WHERE id=?',
    [req.params.id],
    () => res.json({ message: 'Cancelled' })
  );
};
