import prismadb from "@/lib/prismadb"

export const getHotels = async (searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
}) =>{
    try {
        const {title, country, state, city} = searchParams;
        const hotels = await prismadb.hotel.findMany({
            where: {
                title: {
                    contains: title,
                },
                country,
                state,
                city
            },
            include: {rooms: true},
        });

        return hotels;
    } catch (error: any) {
        console.log(error);
        throw new Error(error); 
    }
};