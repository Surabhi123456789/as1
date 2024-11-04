import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Fetch Room Types with Async/Await
export const fetchRoomTypes = async () => {
    try {
        const response = await api.get('/bookings/room-types');
        console.log(response);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching room types:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

// Create Booking with Async/Await
export const createBooking = async (bookingData) => {
    try {
        const response = await api.post('/bookings', bookingData);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};
