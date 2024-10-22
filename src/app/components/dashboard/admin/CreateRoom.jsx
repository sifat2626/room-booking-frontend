"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createRoom } from "@/app/services/roomService";

const CreateRoom = ({ setRooms }) => {
  const [newRoom, setNewRoom] = useState({
    title: "",
    rent: "",
    facilities: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    console.log("Creating room with data:", newRoom);

    if (
      !newRoom.title ||
      !newRoom.rent ||
      !newRoom.facilities ||
      !newRoom.image
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await createRoom(newRoom); // Call the API to create a room

      console.log("Response from server:", response);
      setRooms((prev) => [...prev, response.room]);
      toast.success("Room created successfully!");

      setNewRoom({ title: "", rent: "", facilities: "", image: null });
    } catch (error) {
      console.error("Failed to create room:", error);
      toast.error(error.message || "Failed to create room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Room</h2>

      <input
        type="text"
        placeholder="Room Title"
        value={newRoom.title}
        onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
        required
      />

      <input
        type="number"
        placeholder="Rent"
        value={newRoom.rent}
        onChange={(e) => setNewRoom({ ...newRoom, rent: e.target.value })}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
        required
      />

      <textarea
        placeholder="Facilities (comma separated)"
        value={newRoom.facilities}
        onChange={(e) => setNewRoom({ ...newRoom, facilities: e.target.value })}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
        required
      />

      <input
        type="file"
        onChange={(e) => setNewRoom({ ...newRoom, image: e.target.files[0] })}
        className="mb-4"
        accept="image/*"
      />

      <button
        onClick={handleCreateRoom}
        disabled={loading}
        className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating..." : "Create Room"}
      </button>
    </div>
  );
};

export default CreateRoom;
