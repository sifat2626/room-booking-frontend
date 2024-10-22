"use client";
import { axiosCommon } from "@/app/hooks/useAxios";
import { useEffect, useState } from "react";

function Page({ params }) {
  const [room, setRoom] = useState(null); // Initialize with null to check loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await axiosCommon.get(`/rooms/${params.id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.data; // Use res.data to get the JSON data
        setRoom(data); // Set room data
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchRoomDetails();
  }, [params.id]);

  // Loading state
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center mt-5 text-red-500">{error}</div>;
  }

  // Check if room data is available
  if (!room) {
    return <div className="text-center mt-5">No room details available.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-5">
      <h3 className="text-center text-2xl font-bold mb-4">Room Details</h3>
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={room.picture}
            alt={room.title}
          />
        </div>
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900">{room.title}</h2>
          <p className="mt-2 text-gray-600">Rent: ${room.rent}</p>
          <h3 className="mt-4 text-lg font-semibold">Facilities:</h3>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            {room.facilities && room.facilities.length > 0 ? (
              room.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))
            ) : (
              <li>No facilities listed</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page;
