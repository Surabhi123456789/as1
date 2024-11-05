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

            // Check if guestData and bookingData are provided
            if (!guestData || !bookingData) {
                return res.status(400).json({ message: "Invalid data: guestData and bookingData are required." });
            }

            const result = await BookingModel.createBooking(guestData, bookingData);
            res.status(201).json(result); // Send 201 status for created resource
        } catch (error) {
            console.error("Error in createBooking:", error.message);
            res.status(500).json({ message: "Error creating booking", error: error.message });
        }
    }
};

module.exports = BookingController;
