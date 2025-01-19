import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/AxiosSecure";
import useFetchData from "../../hooks/GetData";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CheckOutForm = ({ id }) => {
  const { user } = useContext(AuthContext);
  const { data: myBookings = {} } = useFetchData(
    ["myBookings"],
    `/api/tourBookings/${id}`
  );
  const navigate = useNavigate();
  const price = myBookings.price;
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const axiosScure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState("");
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axiosScure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosScure, price]);

  const cardStyle = {
    style: {
      base: {
        color: "#1F2937", // Tailwind text-gray-800
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#9CA3AF", // Tailwind text-gray-400
        },
      },
      invalid: {
        color: "#EF4444", // Tailwind text-red-500
        iconColor: "#EF4444",
      },
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log("Stripe.js has not yet loaded.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log("Card Element is missing.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
    }

    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      });

    if (intentError) {
      console.log("intentError");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Create the payment object
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          tourPlace: myBookings.placeId,
          tourDate: myBookings.tourDate,
          tourGuide: myBookings.tourGuide,
          touristName: myBookings.touristName,
        };

        try {
          // Post payment details to the server
          await axiosScure.post("/api/touristsPaidBookings", payment);

          // Update booking status to "Not Pending"
          await axiosSecure.patch(`/api/booking/setPending/${id}`, {
            isPending: false,
          });

          // Display a success message
          Swal.fire({
            title: "Payment Successful!",
            text: "Your payment was successfully processed. Your booking is now under review.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });

          navigate("/dashboard/bookings");
        } catch (error) {
          console.error("Error during payment processing:", error);
          Swal.fire({
            title: "Payment Failed",
            text: "An error occurred while processing your payment. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        }
      }

    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-lg mx-auto p-8 bg-[#F4E3CF] shadow-md shadow-blue-200 rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-800 text-center">
        Secure Checkout
      </h2>
      <p className="text-sm text-blue-600 text-center">
        Pay securely for your order. Amount:{" "}
        <span className="font-semibold text-gray-800">€{price}</span>
      </p>
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        <CardElement options={cardStyle} />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Pay Now
      </button>
      {error && (
        <p className="text-sm text-red-500 text-center mt-2">{error}</p>
      )}
      {transactionId && (
        <p className="text-sm text-green-500 text-center mt-2">
          Payment Successful! Transaction ID: {transactionId}
        </p>
      )}
    </form>
  );
};

CheckOutForm.propTypes = {
  id: PropTypes.string.isRequired, // Ensures id is a required string
};

export default CheckOutForm;
