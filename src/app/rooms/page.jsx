"use client";
import { useEffect, useState } from "react";
import { axiosCommon } from "../hooks/useAxios";
import Link from "next/link";

function Page() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data); // Update state with fetched rooms
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms(); // Call the async function
  }, []);

  async function getRooms() {
    const { data } = await axiosCommon("/rooms");
    return data;
  }

  return (
    <div>
      <h3>Rooms</h3>
      <h3>{rooms.length}</h3>
      {/* Handle empty state */}
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room._id}>
              <Link href={`/rooms/${room._id}`} passHref>
                {room.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Page;
