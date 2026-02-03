const db = require('../config/db');
const { sendEmail } = require('../utils/mailer');

// exports.createBooking = (req, res) => {
//   const { title, start_time, end_time } = req.body;

//   db.query(
//     `SELECT id FROM bookings 
//      WHERE status='BOOKED' AND (start_time < ? AND end_time > ?)`,
//     [end_time, start_time],
//     (err, r) => {
//       if (r.length) return res.status(409).json({ message: 'Time booked' });

//       db.query(
//         'INSERT INTO bookings (user_id,title,start_time,end_time) VALUES (?,?,?,?)',
//         [req.user.id, title, start_time, end_time],
//         () => res.status(201).json({ message: 'Booking created' })
//       );
//     }
//   );
// };

exports.createBooking = (req, res) => {
  const { title, room_id, start_time, end_time } = req.body; // ← ADD room_id

  // Check availability for SPECIFIC ROOM
  db.query(
    `SELECT id FROM bookings 
     WHERE room_id=? AND status='BOOKED' 
     AND (start_time < ? AND end_time > ?)`, // ← CHECK room_id
    [room_id, end_time, start_time], // ← PASS room_id
    (err, r) => {
      if (r.length) return res.status(409).json({ message: 'Time slot already booked for this room' });

      db.query(
        'INSERT INTO bookings (user_id, room_id, title, start_time, end_time) VALUES (?,?,?,?,?)', // ← ADD room_id
        [req.user.id, room_id, title, start_time, end_time], // ← PASS room_id
        () => res.status(201).json({ message: 'Booking created' })
      );
    }
  );
};

exports.checkAvailability = (req, res) => {
  const { room_id, start_time, end_time } = req.body;

  db.query(
    `SELECT id FROM bookings 
     WHERE room_id=? AND status='BOOKED' 
     AND (start_time < ? AND end_time > ?)`,
    [room_id, end_time, start_time],
    (err, r) => {
      if (r.length) {
        return res.status(409).json({ 
          available: false, 
          message: 'Room is already booked for this time slot' 
        });
      }
      res.json({ available: true, message: 'Room is available' });
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
