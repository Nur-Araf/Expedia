import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPackages = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axiosSecure.post("/api/packages", data).then((res) => {
        if (res.data.insertedId) {
          toast.success("Package added successfully");
          navigate("/trips");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F4E3CF] rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-500 text-center mb-6">
        Add Tour Package
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tour Type */}
        <div>
          <label
            htmlFor="tourType"
            className="block text-sm font-medium text-blue-500"
          >
            Tour Type
          </label>
          <input
            type="text"
            id="tourType"
            {...register("tourType", { required: "Tour Type is required" })}
            className="mt-1 p-2 w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.tourType && (
            <p className="text-red-500 text-sm">{errors.tourType.message}</p>
          )}
        </div>

        {/* Trip Title */}
        <div>
          <label
            htmlFor="tripTitle"
            className="block text-sm font-medium text-blue-500"
          >
            Trip Title
          </label>
          <input
            type="text"
            id="tripTitle"
            {...register("tripTitle", { required: "Trip Title is required" })}
            className="mt-1 p-2 w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.tripTitle && (
            <p className="text-red-500 text-sm">{errors.tripTitle.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-blue-500"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be a positive number" },
              valueAsNumber: true, // Ensures the input value is treated as a number
            })}
            className="mt-1 p-2  w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Tour Place */}
        <div>
          <label
            htmlFor="tourPlace"
            className="block text-sm font-medium text-blue-500"
          >
            Tour Place
          </label>
          <input
            type="text"
            id="tourPlace"
            {...register("tourPlace", { required: "Tour Place is required" })}
            className="mt-1 p-2  w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.tourPlace && (
            <p className="text-red-500 text-sm">{errors.tourPlace.message}</p>
          )}
        </div>

        {/* About The Tour */}
        <div>
          <label
            htmlFor="aboutTheTour"
            className="block text-sm font-medium text-blue-500"
          >
            About The Tour
          </label>
          <textarea
            id="aboutTheTour"
            {...register("aboutTheTour", {
              required: "About The Tour is required",
            })}
            className="mt-1 p-2 w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.aboutTheTour && (
            <p className="text-red-500 text-sm">
              {errors.aboutTheTour.message}
            </p>
          )}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-blue-500">
            Images (4 URLs)
          </label>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <input
                type="url"
                {...register(`images[${index}]`, {
                  required: `Image URL ${index + 1} is required`,
                })}
                placeholder={`Image URL ${index + 1}`}
                className="mt-1 p-2  w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.images?.[index] && (
                <p className="text-red-500 text-sm">
                  {errors.images[index]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Tour Plan */}
        <div>
          <h3 className="text-xl font-medium text-blue-500 mb-3">
            Tour Plan (4 Days)
          </h3>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Day {index + 1}
                </label>
                <input
                  type="number" // Ensure input is numeric
                  {...register(`tourPlan[${index}].day`, {
                    required: `Day ${index + 1} is required`,
                    valueAsNumber: true, // Ensures the value is stored as a number
                  })}
                  placeholder={`Day ${index + 1}`}
                  className="mt-1 p-2 w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.tourPlan?.[index]?.day && (
                  <p className="text-red-500 text-sm">
                    {errors.tourPlan[index]?.day?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-500">
                  Plan
                </label>
                <input
                  type="text"
                  {...register(`tourPlan[${index}].plan`, {
                    required: `Plan for Day ${index + 1} is required`,
                  })}
                  placeholder={`Plan for Day ${index + 1}`}
                  className="mt-1 p-2 w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.tourPlan?.[index]?.plan && (
                  <p className="text-red-500 text-sm">
                    {errors.tourPlan[index]?.plan?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-900 text-white px-6 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackages;
