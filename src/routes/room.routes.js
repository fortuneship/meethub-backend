const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const c = require('../controllers/room.controller');

// Public routes (anyone can view rooms)
router.get('/', c.getRooms);
router.get('/:id', c.getRoomById);

// Protected admin routes
router.post('/', auth, c.createRoom);
router.put('/:id', auth, c.updateRoom);
router.delete('/:id', auth, c.deleteRoom);

module.exports = router;