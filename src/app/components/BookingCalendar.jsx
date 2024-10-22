import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar"; // Ensure this is the correct import for your booking calendar
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

const BookingCalendar = ({ bookedDates }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  // Convert booked dates from strings to Date objects and format them for the calendar
  const reservedDates = bookedDates.map((date) => ({
    startDate: new Date(date),
    endDate: new Date(date), // Set both start and end to the same date
  }));

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Select Your Booking Dates</h2>
      <Calendar
        selected={selectedDates} // Currently selected dates
        reserved={reservedDates} // Already booked dates marked as reserved
        onChange={setSelectedDates} // Update selected dates state
      />

      <div className="mt-4">
        <h3 className="font-semibold">Selected Dates:</h3>
        {selectedDates.length > 0 ? (
          selectedDates.map((date, index) => (
            <p key={index}>{date.toDateString()}</p>
          ))
        ) : (
          <p>No dates selected</p>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
