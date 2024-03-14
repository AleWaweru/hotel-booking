import { getHotelsByUserId } from "@/actions/getHotelsByUserId";
import HotelList from "@/components/hotel/HotelList";

const MyHotels = async () => {
  const hotels = await getHotelsByUserId();
  if (!hotels) return <div>No Hotels Found</div>;
  return (
    <div>
      <h2 className="text-2xl font-semibold">Listed Hotels</h2>
      <HotelList hotels={hotels} />
    </div>
  );
};

export default MyHotels;
