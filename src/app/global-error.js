// src/app/global-error.js

"use client"; // This must be a Client Component

import React, { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">
            Something went wrong!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            An unexpected error has occurred.
          </p>
          <button
            onClick={() => reset()} // Attempt to recover by trying to re-render the segment
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
