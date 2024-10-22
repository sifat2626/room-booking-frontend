import { axiosCommon } from "../hooks/useAxios"; // Adjust the import path as necessary

// Function to create a new booking
export async function createBooking(bookingData) {
  try {
    const { data } = await axiosCommon.post("/bookings", bookingData); // Sending POST request to create a booking
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to get all bookings (optional)
export async function getAllBookings() {
  try {
    const { data } = await axiosCommon.get("/bookings"); // Fetching all bookings
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to get bookings by user ID (optional)
export async function getBookingsByUserId(userId) {
  try {
    const { data } = await axiosCommon.get(`/bookings/user/${userId}`); // Fetching bookings for a specific user
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}
