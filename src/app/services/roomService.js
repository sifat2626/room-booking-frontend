const { axiosCommon } = require("../hooks/useAxios");

// Function to get all rooms
export async function getRooms() {
  const { data } = await axiosCommon("/rooms");
  return data;
}

// Function to get a room by ID
export async function getRoomById(id) {
  try {
    const { data } = await axiosCommon(`/rooms/${id}`); // Fetching room by ID
    return data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle errors appropriately
  }
}
