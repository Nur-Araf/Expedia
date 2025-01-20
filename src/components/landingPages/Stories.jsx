import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { motion } from "framer-motion";
import useFetchData from "../../hooks/GetData";
import { AuthContext } from "../../providers/AuthProvider";

const Stories = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: stories = [] } = useFetchData(
    ["stories"],
    "/api/stories/random"
  );

  const handleShare = (storyId) => {
    if (!user) {
      navigate("/log-in");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="p-6 space-y-8 min-h-[95dvh]">
      <h1 className="mt-6 md:mt-10 lg:mt-16 text-3xl font-bold text-center text-blue-600">
        Stories by Customers
      </h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stories.map((story) => (
          <motion.div
            key={story.id}
            className="border bg-[#F4E3CF] border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl"
            variants={itemVariants}
            whileHover="hover"
          >
            <img
              src={story.image}
              alt={story.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {story.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {story.story}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <FacebookShareButton
                  url={`https://yourwebsite.com/stories/${story.id}`}
                  quote={story.title}
                  hashtag="#RandomStories"
                  onClick={() => handleShare(story.id)}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <Link
                  to="/stories"
                  className="text-blue-700 text-sm hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center py-6 md:py-12">
        <Link
          to="/stories"
          className="bg-gradient-to-r from-blue-500 to-indigo-900 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-600"
        >
          All Stories
        </Link>
      </div>
    </div>
  );
};

export default Stories;
