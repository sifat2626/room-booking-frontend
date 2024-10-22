import RoomCard from "../components/RoomCard";
import { getRooms } from "../services/roomService";

async function Page() {
  const rooms = await getRooms();

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} {...room} />
        ))}
      </div>
    </div>
  );
}

export default Page;
