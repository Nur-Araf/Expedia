import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/AxiosSecure";
import useFetchData from "../../hooks/GetData";
import Swal from "sweetalert2";
import axios from "axios";
import Breadcrumb from "../shareComponents/Breadcrumb";

const UpdateStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const router = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Track loading state
  const {
    data: oneStory = {},
    isLoading,
    error,
    refetch,
  } = useFetchData(["oneStory", id], `/api/stories/${id}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Use reset to update form values
  } = useForm();

  useEffect(() => {
    if (oneStory) {
      reset({
        title: oneStory.title || "",
        story: oneStory.story || "",
        newPhoto: "",
      });
    }
  }, [oneStory, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Start loader
    let imageUrl = oneStory.image; // Default to existing image

    if (data.image && data.image.length > 0) {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgdb}`,
          formData
        );
        imageUrl = response.data.data.url; // Update image URL if a new image is uploaded
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        Swal.fire(
          "Error!",
          "Failed to upload the image. Try again later.",
          "error"
        );
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update this story?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        const updatedData = {
          story: data.story,
          title: data.title,
          image: imageUrl,
        };

        // Update the story
        await axiosSecure.patch(`/api/stories/${id}`, updatedData);

        // Show success message
        await Swal.fire(
          "Updated!",
          "Story has been updated successfully.",
          "success"
        );

        // Navigate and refetch data
        router("/dashboard/manage-stories");
        refetch();
      }
    } catch (error) {
      console.error("Error updating story:", error);
      Swal.fire("Error!", "Failed to update the story.", "error");
    } finally {
      setIsSubmitting(false); // Stop loader
    }
  };

  if (isLoading) return <p>Loading story...</p>;
  if (error) return <p>Error fetching story: {error.message}</p>;

  return (
    <div>
      <Breadcrumb pageName="Update Story"/>
      <div className="flex justify-center items-center xl:min-h-[86dvh]">
        <div className="p-4 md:p-6 bg-[#F4E3CF] shadow-lg rounded-lg border border-gray-200 w-full max-w-2xl">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500 text-center mb-4">
            Update Story
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label
                className="block text-blue-500 text-base md:text-lg font-medium"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                {...register("title", { required: "Title is required" })}
                type="text"
                className="w-full text-gray-700 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter story title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-blue-500 text-base md:text-lg font-medium"
                htmlFor="story"
              >
                Story
              </label>
              <textarea
                id="story"
                {...register("story", { required: "Story is required" })}
                className="w-full px-4 py-2 border text-gray-700 rounded focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter story content"
                rows="5"
              ></textarea>
              {errors.story && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.story.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-blue-500 text-base md:text-lg font-medium">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="mt-1 w-full border border-gray-300 bg-white rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-base font-medium md:text-lg hover:bg-blue-600 transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Update Story"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStory;
