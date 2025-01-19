import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import SingUpAnimation from "../animations/SingUpAni";

const SignUp = () => {
  const { setUser, signInWithGoogle, createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);

      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: data.photoUrl,
      });

      const updatedUser = {
        ...result.user,
        photoURL: data.photoUrl,
      };
      toast.success("Registration successful!");
      setUser(updatedUser);
      reset();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Please use a different email.");
      } else {
        toast.error("Please try again!");
      }
      console.error("Error during registration or profile update:", error);
    }
  };

  const handleGmailSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      toast.success("Registration successful!");
      setUser(res.user);
      navigate("/");
    } catch (err) {
      toast.error("Please try again!");
      console.log("Error during Gmail sign-in:", err);
    }
  };

  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  return (
    <>
      <div className="flex lg::justify-between justify-center items-center font-montserrat min-h-screen bg-[#F4E3CF] bg-opacity-50 px-4 py-8 gap-10">
        <div className="bg-[url('/Travel.jpg')] bg-cover p-8 rounded-lg shadow-lg w-full sm:max-w-md lg:max-w-lg">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Register
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-black mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-black mb-2"
              >
                Email
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
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-black mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: strongPasswordRegex,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-semibold text-black mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <HiEyeOff size={20} />
                  ) : (
                    <HiEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="photoUrl"
                className="block text-lg font-semibold text-black mb-2"
              >
                Photo URL
              </label>
              <input
                id="photoUrl"
                type="url"
                {...register("photoUrl", {
                  required: "Photo URL is required",
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/,
                    message: "Invalid image URL",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.photoUrl && (
                <p className="text-sm text-red-500">
                  {errors.photoUrl.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 bg-opacity-70 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleGmailSignIn}
              className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-md text-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              <FaGoogle size={20} />
              <span>Sign Up with Google</span>
            </button>
          </div>

          <p className="mt-4 text-center text-black">
            Already have an account?{" "}
            <Link to="/log-in" className="text-blue-600 font-semibold">
              Login here
            </Link>
          </p>
        </div>
        <div className="w-96 h-96 hidden lg:block">
          <SingUpAnimation />
        </div>
      </div>
    </>
  );
};

export default SignUp;
