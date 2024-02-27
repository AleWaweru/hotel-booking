import { getBookingsByHotelOwnerId } from "@/actions/getBookingsByHotelOwnerId";
import { getBookingsByUserId } from "@/actions/getBookingsByUserId";
import MyBookingsClient from "@/components/booking/myBookingsClient";

const MyBookings  = async() => {
  const bookingdFromVisitors = await getBookingsByHotelOwnerId()
  const bookingsIHaveMade = await getBookingsByUserId()

  if(!bookingdFromVisitors || !bookingsIHaveMade) return <div>No Bookings Found</div>
  
  return (
    <div className="flex flex-col gap-10">
      {!!bookingsIHaveMade?.length && <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">
          Here are bookings you have made
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookingsIHaveMade.map(booking => <MyBookingsClient key={booking.id} booking={booking}/>)}
        </div>
      </div>}
      {!!bookingdFromVisitors?.length && <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">
          Here are bookings made by visitors for your Hotels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookingdFromVisitors.map(booking => <MyBookingsClient key={booking.id} booking={booking}/>)}
        </div>
      </div>}
    </div>)
}

export default MyBookings;