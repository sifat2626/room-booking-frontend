// src/app/services/roomService.js

import { axiosCommon } from "../hooks/useAxios"; // Adjust the import path as necessary

// Function to get all rooms
export async function getRooms() {
  try {
    const { data } = await axiosCommon.get("/rooms");
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Function to get a room by ID
export async function getRoomById(id) {
  try {
    console.log("searching room");
    const { data } = await axiosCommon.get(`/rooms/${id}`); // Fetching room by ID
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Function to create a new room (with image upload)
export async function createRoom(roomData) {
  try {
    const formData = buildFormData(roomData); // Build FormData

    const { data } = await axiosCommon.post("/rooms", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}

// Function to update a room (with image upload if present)
export async function updateRoom(id, roomData) {
  try {
    console.log("roomData=>", roomData);
    const formData = buildFormData(roomData); // Build FormData
    console.log("calling api");
    const { data } = await axiosCommon.put(`/rooms/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("api called", process.env.NEXT_PUBLIC_API_URL);

    return data;
  } catch (error) {
    handleError(error);
  }
}

// Function to delete a room
export async function deleteRoom(id) {
  try {
    const { data } = await axiosCommon.delete(`/rooms/${id}`); // Sending DELETE request to delete a room
    return data;
  } catch (error) {
    handleError(error);
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
    handleError(error);
  }
}

// Helper function to build FormData
// Helper function to build FormData
function buildFormData(roomData) {
  const formData = new FormData();

  if (!roomData.title || !roomData.rent || !roomData.facilities) {
    throw new Error("Title, rent, and facilities are required.");
  }

  formData.append("title", roomData.title);

  const rentValue = Number(roomData.rent);
  if (isNaN(rentValue)) {
    throw new Error("Rent must be a valid number.");
  }

  formData.append("rent", rentValue);

  // Append facilities directly as an array
  if (Array.isArray(roomData.facilities)) {
    roomData.facilities.forEach((facility) => {
      formData.append("facilities[]", facility); // Append each facility separately
    });
  } else {
    throw new Error("Facilities must be an array.");
  }

  if (roomData.image) {
    formData.append("picture", roomData.image); // Ensure 'picture' matches backend key
  }

  return formData;
}

// Centralized error handling
function handleError(error) {
  console.error(
    "API error:",
    error.response ? error.response.data : error.message
  );
  throw error.response ? error.response.data : error.message; // Handle errors appropriately
}
