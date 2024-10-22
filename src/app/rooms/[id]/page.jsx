"use client";
import { useEffect, useState } from "react";
import { getRoomById } from "@/app/services/roomService"; // Import the new service
import useAuthClient from "@/app/hooks/useAuthClient"; // Assuming you have this hook
import { FaDollarSign } from "react-icons/fa";
import { FaClover } from "react-icons/fa6";
import BookingCalendar from "@/app/components/BookingCalendar";

function Page({ params }) {
  useAuthClient(); // Assuming this handles authentication
  const [room, setRoom] = useState(null); // Initialize with null to check loading state
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const data = await getRoomById(params.id); // Use the new service function
        setRoom(data.room); // Set room data
        setBookedDates(data.bookedDates);
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
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 rounded-lg gap-8">
        <div className="col-span-1">
          <img
            src={room.picture}
            alt={room.title}
            className="h-96 w-full object-cover rounded-lg"
          />
        </div>
        <div className="">
          <h3 className="font-bold my-2 text-6xl">{room.title}</h3>
          <div className="flex items-center gap-4">
            <h6 className="text-3xl font-medium">Rent: </h6>
            <div className="flex gap-[1px] items-center">
              <p className="text-3xl font-semibold">{room.rent}</p>
              <FaDollarSign className="text-yellow-500 text-3xl" />
            </div>
          </div>
          <div className="mt-2">
            {room.facilities.map((facility, index) => (
              <div
                className="flex gap-1 items-center text-lg font-medium"
                key={index}
              >
                <FaClover className="text-green-500" />
                {facility}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pass bookedDates to BookingCalendar */}
      <BookingCalendar bookedDates={bookedDates} />
    </div>
  );
}

export default Page;
