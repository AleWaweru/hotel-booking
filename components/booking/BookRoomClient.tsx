"use client";

import useBookRoom from "@/hooks/useBookRoom";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import RoomCard from "../room/RoomCard";
import RoomPaymentForm from "./RoomPaymentForm";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const BookRoomClient = () => {
  const { bookingRoomData, clientSecret } = useBookRoom();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = (value: boolean) => {
    setPaymentSuccess(value);
  };

  if(!paymentSuccess) {
    return <div className="flex items-center flex-col gap-4">
        <h3 className="text-teal-500 text-center">Payment Success</h3>
        <Button onClick={()=>router.push('/my-bookings')}>View Bookings</Button>
    </div>
  }

  return (
    <div className="max-w-[700px] mx-auto">
      {clientSecret && bookingRoomData && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            Complete payement to reserve this room
          </h3>
          <div className="mb-6">
            <RoomCard room={bookingRoomData.room} />
          </div>
          <Elements options={options} stripe={stripePromise}>
            <RoomPaymentForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default BookRoomClient;
