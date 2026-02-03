const db = require('../config/db');

// Get all rooms
exports.getRooms = (req, res) => {
  db.query('SELECT * FROM rooms ORDER BY name', (err, rooms) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rooms);
  });
};

// Get single room
exports.getRoomById = (req, res) => {
  db.query('SELECT * FROM rooms WHERE id=?', [req.params.id], (err, rooms) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!rooms.length) return res.status(404).json({ message: 'Room not found' });
    res.json(rooms[0]);
  });
};

// Create room (admin only)
exports.createRoom = (req, res) => {
  const { name, capacity, location, description, facilities } = req.body;

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  db.query(
    'INSERT INTO rooms (name, capacity, location, description, facilities) VALUES (?,?,?,?,?)',
    [name, capacity, location || '', description || '', facilities || ''],
    (err, result) => {
      if (err) return res.status(400).json({ message: 'Failed to create room' });
      res.status(201).json({ message: 'Room created', id: result.insertId });
    }
  );
};

// Update room (admin only)
exports.updateRoom = (req, res) => {
  const { name, capacity, location, description, facilities } = req.body;

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  db.query(
    'UPDATE rooms SET name=?, capacity=?, location=?, description=?, facilities=? WHERE id=?',
    [name, capacity, location, description, facilities, req.params.id],
    (err) => {
      if (err) return res.status(400).json({ message: 'Failed to update room' });
      res.json({ message: 'Room updated' });
    }
  );
};

// Delete room (admin only)
exports.deleteRoom = (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  db.query('DELETE FROM rooms WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(400).json({ message: 'Failed to delete room' });
    res.json({ message: 'Room deleted' });
  });
};