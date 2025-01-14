import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../../firebase.init";

const ForgetPassword = () => {
  const [searchParams] = useSearchParams();
  const emailFromParams = searchParams.get("email") || "";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Set the email in the input field if available
    if (emailFromParams) {
      setValue("email", emailFromParams);
    }
  }, [emailFromParams, setValue]);

  const onSubmit = ({ email }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          "Password reset email sent successfully. Please check your inbox."
        );
      })
      .catch(() => {
        toast.error("Failed to send password reset email. Please try again.");
      });
  };

  return (
    <div className="flex bg-[#F4E3CF] bg-opacity-50 justify-center items-center px-4 py-44">
      <div className="card bg-base-100 w-full max-w-[32rem] shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Forget Password
          </h2>
          <div className="form-control mb-2">
            <label className="label">
              <span className="block text-lg font-semibold text-black mb-2">
                Email
              </span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 bg-opacity-90 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
