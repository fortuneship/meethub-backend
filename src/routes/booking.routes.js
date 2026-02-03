const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const c = require('../controllers/booking.controller');

router.post('/check', c.checkAvailability);
router.use(auth);
router.post('/', c.createBooking);
router.get('/', c.getBookings);
router.delete('/:id', c.cancelBooking);

module.exports = router;
