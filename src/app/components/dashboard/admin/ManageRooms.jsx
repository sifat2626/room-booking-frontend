"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; // For notifications
import { deleteRoom } from "@/app/services/roomService"; // Import room service functions
import UpdateRoom from "./UpdateRoom"; // Import the Update Room component

const ManageRooms = ({ rooms, setRooms }) => {
  const [editingRoom, setEditingRoom] = useState(null); // State to track which room is being edited

  const handleUpdateClick = (room) => {
    setEditingRoom(room); // Set the current room for editing
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoom(roomId); // Call delete function from service

      setRooms((prev) => prev.filter((room) => room._id !== roomId)); // Remove deleted room from state

      toast.success("Room deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete room.");
    }
  };

  const handleCancelEdit = () => {
    setEditingRoom(null); // Reset editing room state
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Manage Rooms
      </h2>

      {editingRoom ? (
        <UpdateRoom
          room={editingRoom}
          setRooms={setRooms}
          onCancel={handleCancelEdit} // Pass onCancel prop
        />
      ) : (
        <ul className="space-y-4">
          {rooms.map((room) => (
            <li
              key={room._id}
              className="border border-gray-300 p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{room.title}</h3>
                <p>Rent: ${room.rent}</p>
                <p>Facilities: {room.facilities.join(", ")}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateClick(room)} // Set current room for editing
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteRoom(room._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageRooms;
