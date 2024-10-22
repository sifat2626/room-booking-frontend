import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { createBooking } from "@/app/services/bookingService"; // Adjust the import path as necessary
import Swal from "sweetalert2"; // Import SweetAlert2
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // Change to yyyy-mm-dd format
};

const BookingCalendar = ({ bookedDates, roomId }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  });

  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Convert booked dates from strings to Date objects
  const reservedDates = bookedDates.map((date) => new Date(date));

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    setConfirmationMessage(""); // Reset confirmation message when new dates are selected
  };

  const handleConfirmBooking = async () => {
    if (!selectionRange.startDate || !selectionRange.endDate) {
      setConfirmationMessage("Please select a valid date range to book.");
      return;
    }

    // Prepare booking data
    const bookingData = {
      roomId: roomId, // Use the provided room ID
      bookedDates: [],
    };

    // Populate bookedDates array with selected dates in 'yyyy-mm-dd' format
    let currentDate = selectionRange.startDate;
    while (currentDate <= selectionRange.endDate) {
      bookingData.bookedDates.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: "Confirm Booking",
      text: `Are you sure you want to book these dates? From ${formatDate(
        selectionRange.startDate
      )} to ${formatDate(selectionRange.endDate)}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    });

    if (result.isConfirmed) {
      try {
        // Call the createBooking function from the booking service
        const response = await createBooking(bookingData);
        console.log("Booking confirmed:", response);
        setConfirmationMessage("Booking confirmed for selected dates!");

        // Optionally reset selection after confirmation
        setSelectionRange({ startDate: null, endDate: null, key: "selection" });
      } catch (error) {
        console.error("Error creating booking:", error);
        setConfirmationMessage("Failed to confirm booking. Please try again.");
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-8">Select Your Booking Dates</h2>
      <DateRangePicker
        ranges={[selectionRange]} // Pass the current selection range
        onChange={handleSelect} // Update selection state on change
        disabledDates={reservedDates} // Disable already booked dates (if needed)
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        direction="horizontal"
      />

      <div className="mt-4">
        <h3 className="font-semibold">Selected Dates:</h3>
        {selectionRange.startDate && selectionRange.endDate ? (
          <p>
            From: {formatDate(selectionRange.startDate)} - To:{" "}
            {formatDate(selectionRange.endDate)}
          </p>
        ) : (
          <p>No dates selected</p>
        )}
      </div>

      {/* Confirm Booking Button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </button>

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="mt-4 text-green-600 font-semibold">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
