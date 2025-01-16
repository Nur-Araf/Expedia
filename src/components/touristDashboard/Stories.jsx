import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { toast } from "react-toastify";

const Stories = () => {
  const { user } = useContext(AuthContext);
  const axiosScure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgdb}`,
        formData
      );
      const imageUrl = response.data.data.url;
      const usersEmail = user.email;

      const storyData = {
        email: usersEmail,
        title: data.title,
        story: data.story,
        image: imageUrl,
      };
      try {
        axiosScure.post("/stories", storyData).then((res) => {
          if (res.data.insertedId) {
            toast.success("Story added successfully");
            reset();
            router("/dashboard/manage-stories");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center lg:h-[86dvh]">
      <div className="p-4 md:p-6 bg-[#F4E3CF] shadow-lg rounded-lg border border-gray-200 w-full max-w-2xl">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500 text-center mb-4">
          Add A Story
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-blue-500 text-base md:text-lg font-medium"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="mt-1 w-full border rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter story title"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Story Text Area */}
          <div>
            <label
              htmlFor="story"
              className="block text-blue-500 text-base md:text-lg font-medium"
            >
              Story
            </label>
            <textarea
              id="story"
              {...register("story", { required: "Story text is required" })}
              className="mt-1 w-full border rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your story here"
              rows={5}
            ></textarea>
            {errors.story && (
              <span className="text-red-500 text-sm">
                {errors.story.message}
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-blue-500 text-base md:text-lg font-medium">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="mt-1 w-full border border-gray-300 bg-white rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-base font-medium md:text-lg hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stories;
