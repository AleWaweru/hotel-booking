import { Room } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookRoomStore {
  bookingRoomData: RoomDataType | null;
  paymentIntent: string | null;
  clientSecret: string | undefined;
  setRoomData: (data: RoomDataType) => void;
  setPaymentIntent: (paymentIntent: string) => void;
  setClientSecret: (clientSecret: string) => void;
  resetBookRoom: () => void;
}

type RoomDataType = {
  room: Room;
  totalPrice: number;
  breakFastIncluded: boolean;
  startDate: Date;
  endDate: Date;
};

const useBookRoom = create<BookRoomStore>()(
  persist(
    (set) => ({
      bookingRoomData: null,
      paymentIntent: null,
      clientSecret: undefined,

      setRoomData: (data: RoomDataType) => {
        set({ bookingRoomData: data });
      },
      setPaymentIntent: (paymentIntent: string) => {
        set({ paymentIntent });
      },
      setClientSecret: (clientSecret: string) => {
        set({ clientSecret });
      },
      resetBookRoom: () => {
        set({
          bookingRoomData: null,
          paymentIntent: null,
          clientSecret: undefined,
        });
      },
    }),
    {
      name: "BookRoom",
    }
  )
);

export default useBookRoom;