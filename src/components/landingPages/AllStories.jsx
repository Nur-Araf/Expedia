
import { FacebookShareButton, FacebookIcon } from "react-share";
import { motion } from "framer-motion";
import useFetchData from "../../hooks/GetData";

const AllStories = () => {
  const { data: stories = [] } = useFetchData(["stories"], "/api/stories");

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
      <h1 className="mt-4 md:mt-8 lg:mt-12 text-3xl font-bold text-center text-blue-600">
        All Stories
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
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllStories;
