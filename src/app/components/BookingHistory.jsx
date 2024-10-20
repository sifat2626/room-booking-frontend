"use client";
import { useEffect, useState } from "react";
import { axiosCommon } from "@/app/hooks/useAxios"; // Ensure this path is correct
import toast from "react-hot-toast";

function BookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axiosCommon.get("/bookings/history");
        setBookingHistory(response.data); // Assuming response.data contains the booking history
        console.log(response.data);
        toast.success("Booking history loaded successfully");
      } catch (error) {
        console.error("Error fetching booking history:", error);
        toast.error("Failed to load booking history");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3>Your Booking History</h3>
      {bookingHistory.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookingHistory.map((booking) => (
            <li key={booking.id}>
              {" "}
              {/* Adjust according to your booking object structure */}
              <p>{booking.details}</p>{" "}
              {/* Adjust according to your booking object structure */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingHistory;
