const express = require('express');
const BookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/room-types', BookingController.fetchRoomTypes);
router.post('/', BookingController.createBooking);

module.exports = router;
