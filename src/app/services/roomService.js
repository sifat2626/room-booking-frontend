import { axiosCommon } from "../hooks/useAxios"; // Adjust the import path as necessary

// Function to get all rooms
export async function getRooms() {
  try {
    const { data } = await axiosCommon.get("/rooms");
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to get a room by ID
export async function getRoomById(id) {
  try {
    const { data } = await axiosCommon.get(`/rooms/${id}`); // Fetching room by ID
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to create a new room
export async function createRoom(roomData) {
  try {
    const { data } = await axiosCommon.post("/rooms", roomData); // Sending POST request to create a room
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to update a room
export async function updateRoom(id, roomData) {
  try {
    const { data } = await axiosCommon.put(`/rooms/${id}`, roomData); // Sending PUT request to update a room
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to delete a room
export async function deleteRoom(id) {
  try {
    const { data } = await axiosCommon.delete(`/rooms/${id}`); // Sending DELETE request to delete a room
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to check availability of a room for scattered dates
export async function checkAvailability(roomId, bookedDates) {
  try {
    const { data } = await axiosCommon.post("/rooms/check-availability", {
      roomId,
      bookedDates,
    });
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}
