import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../../hooks/GetData";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/AxiosSecure";
import Swal from "sweetalert2";
import Confetti from "react-confetti"; // Import react-confetti
import { toast } from "react-toastify";

const BookPackage = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const navigation = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, watch } = useForm();
  const [tourDate, setTourDate] = useState(new Date());
  const [congratulationsVisible, setCongratulationsVisible] = useState(false); // State to control message visibility
  const [applyButtonEnabled, setApplyButtonEnabled] = useState(false); // State to control Apply button

  const { data: getPackage = [] } = useFetchData(
    ["getPackage"],
    `/api/packages/${id}`
  );

  const { data: bookings = [], refetch } = useFetchData(
    ["bookings"],
    `/api/booking/${user?.email}`
  );

  const { data: allGuides = [] } = useFetchData(
    ["allGuides"],
    `/api/tour-guides`,
    { refetchOnWindowFocus: true }
  );

  useEffect(() => {
    if (getPackage?.price) {
      setValue("price", getPackage.price);
    }

    // Check if the user has booked 3 or more times
    if (bookings.length >= 3) {
      setCongratulationsVisible(true); // Show the message
      setApplyButtonEnabled(true); // Enable the Apply button
    }
  }, [getPackage, bookings, setValue]);

  const guideOptions = allGuides.map((guide) => ({
    value: guide.name,
    label: guide.name,
  }));

  const handleChange = (selectedOption) => {
    const selectedGuide = allGuides.find(
      (guide) => guide.name === selectedOption?.value
    );
    setValue("tourGuide", selectedOption?.value || "");
    setValue("guideEmail", selectedGuide?.email || "");
  };

  const onSubmit = async (data) => {
    const placeId = getPackage.tourPlace;
    const newData = {
      ...data,
      isPending: "Pending",
      placeId: placeId,
      tourDate: tourDate,
      guideEmail: data.guideEmail,
    };

    try {
      const packageExists = await axiosSecure.get("/api/booking/check", {
        params: { email: user?.email, placeId: getPackage.tourPlace },
      });

      if (packageExists.data.exists) {
        Swal.fire({
          title: "Package Already Booked!",
          text: "You have already booked this package.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const res = await axiosSecure.post("/api/booking", newData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Booking Pending!",
          text: "Your booking is pending. Please confirm the booking in the Dashboard!",
          icon: "info",
          confirmButtonText: "OK",
        }).then(() => {
          refetch();
          navigation("/dashboard/bookings");
        });
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  // Watch for live updates
  watch("tourDate", tourDate);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[url('/bg-image.jpg')] bg-cover bg-black bg-opacity-50`}
    >
      <div className="max-w-3xl mx-6 my-8 w-full bg-[url('/Travel.jpg')] bg-cover bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={user?.photoURL}
            alt="Name"
            className="w-24 h-24 rounded-full"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl text-center font-bold text-blue-700 mb-6">
          Book Tour at {getPackage.tourPlace}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tourist Name (read-only) */}
          <div>
            <label className="block text-blue-700 font-medium mb-1">
              Tourist Name
            </label>
            <input
              {...register("touristName")}
              type="text"
              value={user.displayName}
              readOnly
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tourist Email (read-only) */}
          <div>
            <label className="block text-blue-700 font-medium mb-1">
              Tourist Email
            </label>
            <input
              {...register("email")}
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-blue-700 font-medium mb-1">
              Price In Euro
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              value={getPackage.price}
              readOnly
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tour Date */}
          <div>
            <label className="block text-blue-700 font-medium mb-1">
              Tour Date
            </label>
            <DatePicker
              selected={tourDate}
              onChange={(date) => {
                setTourDate(date);
                setValue("tourDate", date);
              }}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tour Guide Name */}
          <div>
            <label className="block text-blue-700 font-medium mb-1">
              Tour Guide Name
            </label>
            <Select
              {...register("tourGuide", { required: true })}
              options={guideOptions}
              onChange={handleChange}
              placeholder="Select a guide"
              className="text-gray-700"
              classNamePrefix="react-select"
              isClearable
            />
          </div>

          {/* Congratulations Message and Apply Button */}
          {congratulationsVisible && (
            <div
              className="text-center bg-green-100 p-4 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-1s"
              style={{ animationDuration: "1s" }}
            >
              <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-green-700">
                Congratulations!
              </h3>
              <p className="text-lg sm:text-base md:text-lg text-green-600">
                You&apos;ve booked more than 3 tours! Enjoy a discount on your
                next package.
              </p>
              <button
                onClick={() => toast.success("Discount Applied")}
                disabled={!applyButtonEnabled}
                className={`mt-4 px-6 py-2 sm:px-4 sm:py-2 rounded-md text-white ${
                  applyButtonEnabled
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                } sm:w-full md:w-auto`}
              >
                Apply Discount
              </button>
            </div>
          )}

          {/* Book Now Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-md shadow-md transition"
            >
              Book Now
            </button>
          </div>
        </form>

        {/* Confetti Effect */}
        {congratulationsVisible && (
          <div className="relative w-full h-full">
            <Confetti
              className="absolute top-0 left-0 w-full h-full"
              width={window.innerWidth} // Use window width to dynamically adjust the confetti width
              height={window.innerHeight} // Similarly, adjust the height for full-screen confetti effect
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPackage;
