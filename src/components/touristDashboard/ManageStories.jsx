import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useFetchData from "../../hooks/GetData";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const ManageStories = () => {
  const { user, userRole } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: stories = [],
    isLoading,
    refetch,
  } = useFetchData(["stories"], `/api/stories/${user?.email}`);
  const navigate = useNavigate();

  const handleDelete = async (storyId) => {
    try {
      await axiosSecure.delete(`/api/stories/${storyId}`);
      refetch();
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-70"></div>
        <p className="text-blue-500 text-lg font-semibold">
          Loading stories...
        </p>
      </div>
    );
  }

  if (!stories.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="text-gray-500 text-3xl">📜</div>
        <p className="text-gray-500 text-lg font-semibold">
          No stories found. Please create one!
        </p>
        {userRole === "Tourist" && (
          <Link
            to={"/dashboard/add-stories"}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform"
          >
            Create One
          </Link>
        )}
        {userRole === "Guide" && (
          <Link
            to={"/dashboard/addGuide-stories"}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform"
          >
            Create One
          </Link>
        )}
      </div>
    );
  }


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
                className="px-4 py-2 flex-1 font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
                onClick={() => navigate(`/dashboard/update-story/${story._id}`)}
              >
                ✏️ Edit
              </button>
              <button
                className="px-4 py-2 flex-1 font-medium bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md transition-all duration-300"
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
