const bcrypt = require('bcrypt');
const db = require('../config/db');
const { generateToken } = require('../utils/jwt');

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)',
    [name, email, hash, role || 'USER'],
    err => {
      if (err) return res.status(400).json({ message: 'Email exists' });
      res.status(201).json({ message: 'User registered' });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email=?', [email], (err, r) => {
    if (!r.length) return res.status(401).json({ message: 'Invalid login' });

    if (!bcrypt.compareSync(password, r[0].password))
      return res.status(401).json({ message: 'Invalid login' });

    const token = generateToken({ id: r[0].id, role: r[0].role });
    res.json({ token, user: r[0] });
  });
};

exports.logout = (req, res) => {
  // No real server-side logout needed for stateless JWT
  res.json({ message: "Logged out successfully" });
};
