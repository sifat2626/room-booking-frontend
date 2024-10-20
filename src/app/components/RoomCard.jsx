import { Card, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

function RoomCard({ _id, title, rent, facilities, picture }) {
  return (
    <div className="col-span-1 p-4 border border-green-500 rounded w-full bg-blue-500">
      <div className="h-48 bg-red-500 w-full"></div>
      <div className="flex justify-end">
        <button className="px-4 py-2 text-white bg-green-500 mt-4">
          <Link href={`/rooms/${_id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
