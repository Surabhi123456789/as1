import { useState, useEffect } from 'react';
import { fetchRoomTypes, createBooking } from '../services/api';

const BookingForm = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        idType: '',
        idNumber: '',
        dateOfBirth: '',
        checkInDate: '',
        checkOutDate: '',
        roomType: '',
    });

    const idTypes = ["Passport", "Driver's License", "National ID", "Other"];

    useEffect(() => {
        // Fetch room types from the backend
        const fetchData = async () => {
            try {
                const response = await fetchRoomTypes();
                console.log(response);
                setRoomTypes(response.data); // Ensure response.data is the correct format
            } catch (error) {
                console.error("Error fetching room types:", error);
                // You may want to set roomTypes to an empty array or handle this error differently
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit booking data to the backend
        createBooking(formData)
            .then(() => alert('Booking successful!'))
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Hotel Room Booking</h2>
            <div className="grid gap-4">
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="border p-2 rounded w-full" />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="border p-2 rounded w-full" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 rounded w-full" />
                <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className="border p-2 rounded w-full" />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="border p-2 rounded w-full" />

                <label className="block text-sm font-medium text-gray-700">ID Type</label>
                <select name="idType" onChange={handleChange} required className="border p-2 rounded w-full">
                    <option value="">Select ID Type</option>
                    {idTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>

                <input type="text" name="idNumber" placeholder="ID Number" onChange={handleChange} required className="border p-2 rounded w-full" />
                
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input type="date" name="dateOfBirth" onChange={handleChange} required className="border p-2 rounded w-full" />

                <label className="block text-sm font-medium text-gray-700">Check-In Date</label>
                <input type="date" name="checkInDate" onChange={handleChange} required className="border p-2 rounded w-full" />

                <label className="block text-sm font-medium text-gray-700">Check-Out Date</label>
                <input type="date" name="checkOutDate" onChange={handleChange} required className="border p-2 rounded w-full" />

                <label className="block text-sm font-medium text-gray-700">Room Type</label>
                <select name="roomType" onChange={handleChange} required className="border p-2 rounded w-full">
                    <option value="">Select Room Type</option>
                    {roomTypes.map((type) => (
                        <option key={type.room_type_id} value={type.room_type_id}>{type.type_name}</option>
                    ))}
                </select>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Book Now</button>
            </div>
        </form>
    );
};

export default BookingForm;
