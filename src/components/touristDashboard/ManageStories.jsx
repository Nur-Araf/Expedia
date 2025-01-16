import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useFetchData from "../../hooks/GetData";
import useAxiosSecure from "../../hooks/AxiosSecure";

const ManageStories = () => {
 const axiosSecure = useAxiosSecure();
  const {
    data: stories = [],
    isLoading,
    error,
    refetch,
  } = useFetchData(["stories"], "/api/stories");
  const navigate = useNavigate();

  const handleDelete = async (storyId) => {
    try {
      await axiosSecure.delete(`/api/stories/${storyId}`);
      refetch();
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  if (isLoading) return <p>Loading stories...</p>;
  if (error) return <p>Error fetching stories: {error.message}</p>;
  if (!stories.length) return <p>No stories found.</p>;

  return (
    <div className="min-h-[80dvh]">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-500 text-center mb-4">
        Manage Stories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <motion.div
            key={story._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#F4E3CF] rounded-lg shadow-lg p-4 flex flex-col justify-between transition-all duration-300"
          >
            <motion.img
              src={story.image}
              alt={story.title}
              className="h-40 w-full object-cover rounded-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <h2 className="text-blue-600 text-xl font-semibold mt-4 truncate">
              {story.title}
            </h2>
            <p className="text-blue-600 font-medium my-2 line-clamp-2">
              {story.story}
            </p>
            <div className="flex gap-2 mt-auto">
              <button
                className="px-4 py-2 flex-1 font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
                onClick={() => navigate(`/dashboard/update-story/${story._id}`)}
              >
                ✏️ Edit
              </button>
              <button
                className="px-4 py-2 flex-1 font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
                onClick={() => handleDelete(story._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
