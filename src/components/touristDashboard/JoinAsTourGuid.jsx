import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Breadcrumb from "../shareComponents/Breadcrumb";

const JoinAsTourGuid = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const newData = {
        ...data,
        email: user?.email,
        name: user?.displayName,
        isAccepted: false,
      }
      await axiosSecure.post("/api/joinAsTourGuid", newData);
      reset();
      Swal.fire({
        title: "Application Successful! Check Role on Profile After Some Time",
        text: "Your application has been submitted successfully. ",
        icon: "success",
        confirmButtonText: "Okay",
      });
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Something went wrong. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Join as Tour Guide"/>
      <div className="flex justify-center items-center xl:min-h-[86dvh]">
        <div className="p-4 md:p-6 bg-[#F4E3CF] shadow-lg rounded-lg border border-gray-200 w-full max-w-2xl">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500 text-center mb-4">
            Join as a Tour Guide
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block mb-1 text-blue-500 text-base md:text-lg font-medium"
              >
                Application Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", {
                  required: "Application title is required",
                })}
                className="w-full border rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter application title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="reason"
                className="block mb-1 text-blue-500 text-base md:text-lg font-medium"
              >
                Why do you want to be a Tour Guide?
              </label>
              <textarea
                id="reason"
                {...register("reason", { required: "This field is required" })}
                className="w-full border rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Explain why you want to join"
                rows="4"
              ></textarea>
              {errors.reason && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="cvLink"
                className="block mb-1 text-blue-500 text-base md:text-lg font-medium"
              >
                CV Link
              </label>
              <input
                id="cvLink"
                type="url"
                {...register("cvLink", {
                  required: "CV link is required",
                  pattern: {
                    value: /^(https?:\/\/[\w.-]+\.[a-z]{2,})(\/\S*)?$/,
                    message: "Please enter a valid URL",
                  },
                })}
                className="w-full border rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter CV link"
              />
              {errors.cvLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cvLink.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg text-base font-medium md:text-lg hover:bg-blue-600 transition-colors ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinAsTourGuid;
