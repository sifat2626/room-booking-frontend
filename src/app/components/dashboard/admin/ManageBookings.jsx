"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // For notifications
import { getAllBookings, cancelBooking } from "@/app/services/bookingService"; // Import booking service functions
import { format } from "date-fns"; // Import date-fns for date formatting

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]); // State to hold booking data

  // Fetch all bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingData = await getAllBookings();
        setBookings(bookingData);
      } catch (error) {
        toast.error("Failed to load bookings.");
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId); // Call cancel function from service

      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      ); // Remove canceled booking from state

      toast.success("Booking canceled successfully!");
    } catch (error) {
      toast.error("Failed to cancel booking.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Manage Bookings
      </h2>

      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking._id}
            className="border border-gray-300 p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">
                Booking for Room: {booking.roomId.title}
              </h3>
              <p>
                Booked Dates:{" "}
                {booking.bookedDates
                  .map((date) => format(new Date(date), "MMM dd, yyyy"))
                  .join(", ")}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleCancelBooking(booking._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
              >
                Cancel Booking
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBookings;
