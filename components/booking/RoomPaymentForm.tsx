import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useBookRoom from "@/hooks/useBookRoom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import moment from "moment";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { RocketIcon, Terminal } from "lucide-react";

interface RoomPaymentFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const RoomPaymentForm = ({
  clientSecret,
  handleSetPaymentSuccess,
}: RoomPaymentFormProps) => {
  const { bookingRoomData, resetBookRoom } = useBookRoom();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
    setIsLoading(false);
  }, [stripe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !bookingRoomData) {
      return;
    }

    try {
      stripe
        .confirmPayment({ elements, redirect: "if_required" })
        .then((result) => {
          if (!result.error) {
            axios
              .patch(`/api/booking/${result.paymentIntent?.id}`)
              .then((res) => {
                toast({
                  variant: "success",
                  description: "🎉Payment Success",
                });
                router.refresh();
                resetBookRoom();
                handleSetPaymentSuccess(true);
                setIsLoading(false);
              })
              .catch((error) => {
                console.log(error);
                toast({
                  variant: "destructive",
                  description: "🎉Something went wrong",
                });
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (!bookingRoomData?.startDate || !bookingRoomData?.endDate)
    return <div>Error: Missing reservation dates...</div>;

  const startDate = moment(bookingRoomData?.startDate).format("MMMM Do YYYY");
  const endDate = moment(bookingRoomData?.endDate).format("MMMM Do YYYY");

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="font-semibold mb-2 text-lg">Billing Address</h2>
      <AddressElement
        options={{
          mode: "billing",
        }}
      />
      <h2 className="font-semibold mt-4 mb-2 text-lg">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="flex flex-col gap-1">
        <Separator />
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold mb-1 text-lg">Your booking Summary</h2>
          <div>You will check-in on {startDate} at 5PM</div>
          <div>You will check-out on {endDate} at 5PM</div>
          {bookingRoomData?.breakFastIncluded && (
            <div>You will be served breakFast everyday at 8AM</div>
          )}
        </div>
        <Separator />
        <div className="font-bold text-lg">
          {bookingRoomData?.breakFastIncluded && (
            <div className="mb-2">
              BreakFast Price: ${bookingRoomData.room.breakFastPrice}
            </div>
          )}
          Total Price: ${bookingRoomData?.totalPrice}
        </div>
      </div>
      {isLoading && (
        <Alert className="bg-indigo-600 text-white">
          <Terminal className="h-4 w-4 stroke-white" />
          <AlertTitle> Payment processing...</AlertTitle>
          <AlertDescription>
            Please stay on the page as we complete processing your payment
          </AlertDescription>
        </Alert>
      )}
      <Button disabled={isLoading}>
        {isLoading ? "Processing Payment..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default RoomPaymentForm;
