import { axiosCommon } from "../hooks/useAxios"; // Adjust the import path as necessary

// Function to create a new booking (admin only)
export async function createBooking(bookingData) {
  try {
    const { data } = await axiosCommon.post("/bookings", bookingData); // Sending POST request to create a booking
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to update an existing booking (admin only)
export async function updateBooking(bookingId, bookingData) {
  try {
    const { data } = await axiosCommon.put(
      `/bookings/${bookingId}`,
      bookingData
    ); // Sending PUT request to update a booking
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to get booking history for a user
export async function getBookingHistory() {
  try {
    const { data } = await axiosCommon.get("/bookings/history"); // Fetching bookings for the authenticated user
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to cancel a booking (admin only)
export async function cancelBooking(bookingId) {
  try {
    const { data } = await axiosCommon.delete(`/bookings/${bookingId}`); // Sending DELETE request to cancel a booking
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to get all bookings (admin only)
export async function getAllBookings() {
  try {
    const { data } = await axiosCommon.get("/bookings"); // Fetching all bookings
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}
