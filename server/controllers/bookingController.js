// controllers/bookingController.js
const BookingModel = require('../models/bookingModel');

const BookingController = {
    async fetchRoomTypes(req, res) {
        try {
            const roomTypes = await BookingModel.getRoomTypes();
            res.json(roomTypes);
        } catch (error) {
            console.error("Error in fetchRoomTypes:", error);
            res.status(500).json({ message: "Error fetching room types", error: error.message });
        }
    },

    async createBooking(req, res) {
        try {
            const { guestData, bookingData } = req.body;
            console.log("Booking data received:", req.body);

            const result = await BookingModel.createBooking(guestData, bookingData);
            res.json(result);
        } catch (error) {
            console.error("Error in createBooking:", error.message);
            res.status(500).json({ message: "Error creating booking", error: error.message });
        }
    }
};

module.exports = BookingController;
