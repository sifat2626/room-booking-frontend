// src/app/services/roomService.js

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

// Function to create a new room (with image upload)
export async function createRoom(roomData) {
  try {
    const formData = new FormData(); // Use native FormData
    formData.append("title", roomData.title);

    // Convert rent to a number and append
    const rentValue = Number(roomData.rent);
    if (isNaN(rentValue)) {
      throw new Error("Rent must be a valid number."); // Validate if rent is a number
    }
    formData.append("rent", rentValue); // Append rent as a number

    // Append facilities as an array directly
    const facilitiesArray = roomData.facilities
      .split(",")
      .map((facility) => facility.trim());
    formData.append("facilities", JSON.stringify(facilitiesArray)); // Ensure this matches backend expectations

    if (roomData.image) {
      formData.append("picture", roomData.image); // Ensure 'picture' matches backend key
    }

    // Log FormData contents for debugging
    console.log("Logging FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}, Type: ${typeof value}`);
    }

    const { data } = await axiosCommon.post("/rooms", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(
      "Error creating room:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}

// Function to update a room (with image upload if present)
export async function updateRoom(id, roomData) {
  try {
    const formData = new FormData(); // Use native FormData
    formData.append("title", roomData.title);

    const rentValue = Number(roomData.rent);
    if (isNaN(rentValue)) {
      throw new Error("Rent must be a valid number.");
    }

    formData.append("rent", rentValue); // Ensure rent is sent as a number

    const facilitiesArray = roomData.facilities
      .split(",")
      .map((facility) => facility.trim());
    formData.append("facilities", JSON.stringify(facilitiesArray)); // Ensure this matches backend expectations

    if (roomData.image) {
      formData.append("picture", roomData.image); // Image file
    }

    const { data } = await axiosCommon.put(`/rooms/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(
      "Error updating room:",
      error.response ? error.response.data : error.message
    );
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
