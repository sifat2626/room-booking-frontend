"use client";
import React from "react";
import { toast } from "react-hot-toast"; // For notifications
import { updateRoom, deleteRoom } from "@/app/services/roomService"; // Import room service functions

const ManageRooms = ({ rooms, setRooms }) => {
  const handleUpdateRoom = async (roomId) => {
    const title = prompt("Enter new title:");
    const rent = prompt("Enter new rent:");
    const facilities = prompt("Enter new facilities (comma separated):");

    if (!title || !rent || !facilities) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("rent", rent);
      formData.append("facilities", facilities.split(","));

      const response = await updateRoom(roomId, formData);

      setRooms((prev) =>
        prev.map((room) => (room._id === roomId ? response : room))
      ); // Update room in state

      toast.success("Room updated successfully!");
    } catch (error) {
      toast.error("Failed to update room.");
    }
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

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Manage Rooms
      </h2>
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
                onClick={() => handleUpdateRoom(room._id)}
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
    </div>
  );
};

export default ManageRooms;
