"use client";
import { useEffect, useState } from "react";
import { getBookingHistory } from "@/app/services/bookingService"; // Importing the booking service
import toast from "react-hot-toast";
import { format } from "date-fns"; // Import date-fns for date formatting
import Button from "./Button";
import Link from "next/link";

function BookingHistory({ userId }) {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await getBookingHistory(userId); // Fetching booking history for the user
        setBookingHistory(response); // Assuming response contains the booking history
        console.log(response);
        toast.success("Booking history loaded successfully");
      } catch (error) {
        console.error("Error fetching booking history:", error);
        toast.error("Failed to load booking history");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, [userId]); // Dependency array includes userId

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-green-500 mb-4">
        Your Booking History
      </h3>
      {bookingHistory.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <ul className="list-inside">
          {bookingHistory.map((booking) => (
            <li key={booking._id} className="mb-4">
              <div className="border border-green-300 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <h4 className="font-semibold text-green-600">
                  Room: {booking.roomId.title}
                </h4>
                {/* Format booked dates using date-fns */}
                <p className="text-gray-700 font-semibold">
                  Booked Dates:{" "}
                  {booking.bookedDates
                    .map((date) => format(new Date(date), "MMM dd, yyyy"))
                    .join(", ")}
                </p>
                <p className="text-gray-700 font-semibold">
                  Status: {booking.status || "Confirmed"}
                </p>
                <button className="mt-1 px-4 py-2 text-white bg-green-500 rounded-lg">
                  <Link href={`/rooms/${booking.roomId._id}`}>
                    View Room Details
                  </Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingHistory;
