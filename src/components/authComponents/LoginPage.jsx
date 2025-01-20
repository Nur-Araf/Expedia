import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import LoginAnimation from "../animations/LoginAnim";
import useAxiosSecure from "../../hooks/AxiosSecure";

const LoginPage = () => {
  const { signIn, setUser, signInWithGoogle, fetchUserRole } =
    useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    try {
      signIn(data.email, data.password)
        .then(
          (res) => setUser(res.user),
          reset(),
          navigate("/"),
          toast.success("SingIn successful!")
        )
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error("Please try again!");
      console.log(error);
    }
  };

  const handleGmailSignIn = async () => {
    try {
      const res = await signInWithGoogle();

      // Add user to the database
      await axiosSecure.post("/users", {
        email: res.user.email,
      });
       
      await fetchUserRole(res.user.email);
      toast.success("SingIn successful!"), setUser(res.user), navigate("/");
    } catch (err) {
      toast.error("Please try again!");
      console.error("Error during Gmail sign-in:", err);
    }
  };

  return (
    <div className="flex gap-6 font-montserrat justify-center items-center min-h-screen bg-[#F4E3CF] bg-opacity-50 px-4 py-8">
      <div className="bg-[url('/Travel.jpg')] bg-cover lg:ml-32 p-8 rounded-lg shadow-lg w-full sm:max-w-md lg:max-w-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <Link
              to={"/forget-password"}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-600 bg-opacity-70 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGmailSignIn}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-md text-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <FaGoogle className="text-red-500 text-xl" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            Don&apos;t have an account?{" "}
            <Link to={"/sign-up"} className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
      <div className="w-[450px] h-[450px] hidden lg:block">
        <LoginAnimation />
      </div>
    </div>
  );
};

export default LoginPage;
