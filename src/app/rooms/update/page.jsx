"use client";
// src/app/pages/updateRoom.js

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getRoomById } from "@/app/services/roomService"; // Import your service function
import UpdateRoom from "@/app/components/dashboard/admin/UpdateRoom";

const UpdateRoomPage = () => {
  const searchParams = useSearchParams();
  const { id } = searchParams.get("id"); // Get room ID from query parameters
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchRoom = async () => {
        try {
          const fetchedRoom = await getRoomById(id);
          setRoom(fetchedRoom);
        } catch (error) {
          console.error("Failed to fetch room:", error);
        }
      };

      fetchRoom();
    }
  }, [id]);

  if (!room) return <p>Loading...</p>; // Loading state while fetching

  return (
    <div>
      <h1 className="text-2xl font-semibold">Update Room</h1>
      <UpdateRoom room={room} setRooms={() => {}} />{" "}
      {/* Pass necessary props */}
    </div>
  );
};

export default UpdateRoomPage;
