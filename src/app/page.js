import Link from "next/link";
import Button from "./components/Button";
import RoomCard from "./components/RoomCard";
import { getRooms } from "./services/roomService";

export default async function Home() {
  const rooms = await getRooms();
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.slice(0, 3).map((room) => (
          <RoomCard key={room._id} {...room} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button>
          <Link href={"/rooms"}>View All Rooms</Link>
        </Button>
      </div>
    </>
  );
}
