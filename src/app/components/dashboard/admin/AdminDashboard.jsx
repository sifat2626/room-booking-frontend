"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // For notifications
import { useAuth } from "@/app/context/authContext"; // Ensure the import path is correct
import useAdmin from "@/app/hooks/useAdmin";
import { getRooms } from "@/app/services/roomService"; // Import room service functions
import CreateRoom from "./CreateRoom"; // Import CreateRoom component
import ManageRooms from "./ManageRooms"; // Import ManageRooms component
import ManageBookings from "./ManageBookings"; // Import ManageBookings component

const AdminDashboard = () => {
  useAdmin();
  const { user } = useAuth(); // Get user from AuthContext
  const [rooms, setRooms] = useState([]); // State to hold room data

  // Fetch all rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomData = await getRooms();
        setRooms(roomData);
      } catch (error) {
        toast.error("Failed to load rooms.");
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Admin Dashboard
      </h1>
      <CreateRoom setRooms={setRooms} /> {/* Pass setRooms to CreateRoom */}
      <ManageRooms rooms={rooms} setRooms={setRooms} />{" "}
      {/* Pass rooms and setRooms */}
      <ManageBookings /> {/* Add ManageBookings component */}
    </div>
  );
};

export default AdminDashboard;
