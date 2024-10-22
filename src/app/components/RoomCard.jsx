import Link from "next/link";
import { FaDollarSign } from "react-icons/fa";
import { FaClover } from "react-icons/fa6";

function RoomCard({ _id, title, rent, facilities, picture }) {
  return (
    <div className="col-span-1 p-4 border-2 border-green-500 rounded-lg w-full flex flex-col">
      <div className="overflow-hidden rounded-lg">
        <img
          src={picture}
          alt={title}
          className="h-48 w-full object-cover rounded-lg hover:scale-125 transition-all duration-300"
        />
      </div>
      <div className="flex-grow">
        <p className="font-bold my-2 text-2xl">{title}</p>
        <div className="flex gap-[2px] items-center">
          <FaDollarSign className="text-yellow-500 text-lg" />
          <p className="text-lg font-semibold">{rent}</p>
        </div>
        <div className="mt-2">
          {facilities.map((facility, index) => (
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

      {/* Flex container for the button */}
      <div className="flex items-end mt-auto">
        {" "}
        {/* Align button at bottom */}
        <button className="mt-4 px-4 py-2 text-white bg-green-500 w-full rounded-lg text-lg font-medium">
          <Link href={`/rooms/${_id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
