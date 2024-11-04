const db = require('../config/db');

const BookingModel = {
    async getRoomTypes() {
        try {
            const [roomTypes] = await db.query('SELECT * FROM RoomTypes');
            return roomTypes;
        } catch (error) {
            throw new Error("Error fetching room types: " + error.message);
        }
    },

    async createBooking(guestData, bookingData) {
        try {
            const { firstName, lastName, email, phoneNumber, address, idType, idNumber, dateOfBirth } = guestData;
            const { checkInDate, checkOutDate, roomType } = bookingData;

            // Check if guest already exists
            const [existingGuest] = await db.query('SELECT guest_id FROM Guests WHERE email = ?', [email]);
            let guestId;
            if (existingGuest.length > 0) {
                guestId = existingGuest[0].guest_id;
            } else {
                const [guestResult] = await db.query(
                    'INSERT INTO Guests (first_name, last_name, email, phone_number, address, ID_TYPE, ID_number, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [firstName, lastName, email, phoneNumber, address, idType, idNumber, dateOfBirth]
                );
                guestId = guestResult.insertId;
            }

            // Insert booking data
            await db.query(
                'INSERT INTO Bookings (guest_id, room_id, check_in_date, check_out_date, booking_status, total_amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [guestId, roomType, checkInDate, checkOutDate, 'confirmed', 0.00, 'unpaid']
            );

            return { message: "Booking created successfully" };
        } catch (error) {
            throw new Error("Error creating booking: " + error.message);
        }
    }
};

module.exports = BookingModel;
