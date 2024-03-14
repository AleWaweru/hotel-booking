import { getHotels } from "@/actions/getHotels";
import Container from "@/components/Container";
import LocationFilter from "@/components/LocationFilter";
import HotelList from "@/components/hotel/HotelList";
import Navbar from "@/components/layout/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

interface HomeProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

export default async function HotelPg({ searchParams }: HomeProps) {
  const hotels = await getHotels(searchParams)

  if(!hotels) return <div>No hotels found....</div>
  return (
   <div>
    {/* <HomePage/> */}
    <HotelList hotels={hotels}/>
   </div>
  );
}
