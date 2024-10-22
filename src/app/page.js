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
      <h3>todo:</h3>
      <h3>booking</h3>
      <h3>register</h3>
      <h3>user dashboard</h3>
      <h3>admin dashboard</h3>
      <h3>fix navbar</h3>
      <h3>fix home page</h3>
      <h3>fix rooms page</h3>
      <h3>title</h3>
      <h3>error page</h3>
      <h3>footer</h3>
    </>
  );
}
