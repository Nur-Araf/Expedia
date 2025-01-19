import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);
const PaymentPage = () => {
  const { id } = useParams();

  return (
    <div className="mx-4 my-16 md:m-20 lg:m-36">
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm id={id}/>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
