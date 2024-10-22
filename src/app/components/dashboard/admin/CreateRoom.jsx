"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; // For notifications
import { createRoom } from "@/app/services/roomService"; // Import room service functions

const CreateRoom = ({ setRooms }) => {
  const [newRoom, setNewRoom] = useState({
    title: "",
    rent: "",
    facilities: "",
    images: [],
  }); // State for new room data

  const handleCreateRoom = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newRoom.title);
      formData.append("rent", newRoom.rent);
      formData.append("facilities", newRoom.facilities.split(",")); // Split by commas for facilities
      newRoom.images.forEach((image) => formData.append("images", image));

      const response = await createRoom(formData);
      setRooms((prev) => [...prev, response.room]); // Add newly created room to state
      toast.success("Room created successfully!");
      setNewRoom({ title: "", rent: "", facilities: "", images: [] }); // Reset form
    } catch (error) {
      toast.error("Failed to create room.");
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
      />
      <input
        type="number"
        placeholder="Rent"
        value={newRoom.rent}
        onChange={(e) => setNewRoom({ ...newRoom, rent: e.target.value })}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
      />
      <textarea
        placeholder="Facilities (comma separated)"
        value={newRoom.facilities}
        onChange={(e) => setNewRoom({ ...newRoom, facilities: e.target.value })}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
      />
      <input
        type="file"
        multiple
        onChange={(e) =>
          setNewRoom({ ...newRoom, images: Array.from(e.target.files) })
        }
        className="mb-4"
      />
      <button
        onClick={handleCreateRoom}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
