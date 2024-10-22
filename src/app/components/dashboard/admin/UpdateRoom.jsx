// src/app/components/UpdateRoom.js

"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; // For notifications
import { updateRoom } from "@/app/services/roomService"; // Import room service functions

const UpdateRoom = ({ room, setRooms, onCancel }) => {
  const [updatedRoom, setUpdatedRoom] = useState({
    title: room.title || "",
    rent: Number(room.rent) || 0,
    facilities: room.facilities.join(", ") || "", // Assuming facilities is an array
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleUpdateRoom = async () => {
    console.log("Updating room with data:", updatedRoom);

    if (!updatedRoom.title || !updatedRoom.rent || !updatedRoom.facilities) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Check if rent is a valid number
    if (isNaN(updatedRoom.rent) || updatedRoom.rent <= 0) {
      toast.error("Rent must be a valid positive number.");
      return;
    }

    try {
      setLoading(true);
      const response = await updateRoom(room._id, {
        title: updatedRoom.title,
        rent: updatedRoom.rent,
        facilities: updatedRoom.facilities
          .split(",")
          .map((facility) => facility.trim()),
        image: updatedRoom.image,
      });

      console.log("Response from server:", response);
      setRooms((prev) => prev.map((r) => (r._id === room._id ? response : r))); // Update room in state

      toast.success("Room updated successfully!");
    } catch (error) {
      console.error("Failed to update room:", error);
      toast.error(error.message || "Failed to update room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Room</h2>

      <input
        type="text"
        placeholder="Room Title"
        value={updatedRoom.title}
        onChange={(e) =>
          setUpdatedRoom({ ...updatedRoom, title: e.target.value })
        }
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
        required
      />

      <input
        type="number"
        placeholder="Rent"
        value={updatedRoom.rent}
        onChange={(e) => {
          const value = e.target.value;
          const rentValue = Number(value);
          if (!isNaN(rentValue)) {
            setUpdatedRoom({ ...updatedRoom, rent: rentValue });
          } else {
            setUpdatedRoom({ ...updatedRoom, rent: "" }); // Reset if invalid
          }
        }}
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
        required
      />

      <textarea
        placeholder="Facilities (comma separated)"
        value={updatedRoom.facilities}
        onChange={(e) =>
          setUpdatedRoom({ ...updatedRoom, facilities: e.target.value })
        }
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
        required
      />

      <input
        type="file"
        onChange={(e) =>
          setUpdatedRoom({ ...updatedRoom, image: e.target.files[0] })
        }
        className="mb-4"
        accept="image/*"
      />

      <button
        onClick={handleUpdateRoom}
        disabled={loading}
        className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Updating..." : "Update Room"}
      </button>

      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 ml-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateRoom;
