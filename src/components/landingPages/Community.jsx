import { motion } from "framer-motion";
import AllStories from "./AllStories";

const Community = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#F4E3CF] text-blue-500 py-20">
        <motion.div
          className="text-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            Join Our Global Travel Community
          </h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            Explore new destinations, share travel tips, and connect with fellow
            travelers from around the world.
          </p>
        </motion.div>
      </section>

      <AllStories />

      {/* Community Benefits Section */}
      <section className="max-w-[25rem] md:max-w-2xl lg:max-w-7xl mx-auto py-16">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl text-blue-500 md:text-3xl font-semibold mb-8">
            Why Join Our Travel Community?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-[#F4E3CF] shadow-lg p-4 rounded-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold">Discover Hidden Gems</h3>
              <p className="mt-4">
                Join us and discover unique, off-the-beaten-path destinations
                and travel experiences.
              </p>
            </motion.div>
            <motion.div
              className="bg-[#F4E3CF] shadow-lg p-4 rounded-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold">
                Travel Tips & Recommendations
              </h3>
              <p className="mt-4">
                Get expert travel tips, packing lists, and guides from fellow
                travelers to enhance your journeys.
              </p>
            </motion.div>
            <motion.div
              className="bg-[#F4E3CF] shadow-lg p-4 rounded-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold">Travel Buddy Network</h3>
              <p className="mt-4">
                Find travel buddies and create unforgettable memories with
                like-minded adventurers.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F4E3CF] py-16">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            What Our Travelers Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              className="bg-gray-200 shadow-lg p-4 text-blue-500 rounded-lg max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg italic">
                &quot;I’ve discovered some incredible destinations that I never
                would have found on my own!&quot;
              </p>
              <h4 className="mt-4 font-semibold">Emma Green</h4>
              <p>Travel Enthusiast</p>
            </motion.div>
            <motion.div
              className="bg-gray-200 shadow-lg p-4 text-blue-500 rounded-lg max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg italic">
                &quot;The travel tips shared by other members have saved me so
                much time and effort on my trips!&quot;
              </p>
              <h4 className="mt-4 font-semibold">John Doe</h4>
              <p>Frequent Traveler</p>
            </motion.div>
            <motion.div
              className="bg-gray-200 shadow-lg p-4 text-blue-500 rounded-lg max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg italic">
                &quot;I found my perfect travel buddy in this community, and
                we’ve had unforgettable adventures!&quot;
              </p>
              <h4 className="mt-4 font-semibold">Sophia Lee</h4>
              <p>Solo Traveler</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="py-16">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            Join the Adventure Today!
          </h2>
          <p className="text-lg max-w-4xl mx-auto mb-8">
            Whether you're looking for tips, new travel friends, or hidden gems,
            our community is here to help you explore the world. Take the first
            step towards your next adventure today!
          </p>
          <a
            href="/join-community"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold"
          >
            Join Now
          </a>
        </motion.div>
      </section> */}
    </div>
  );
};

export default Community;
