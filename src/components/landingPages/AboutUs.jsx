import { motion } from "framer-motion";

const AboutUs = () => {
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
            Welcome to Our Tour Management
          </h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            Explore amazing tour packages, safety tips, and become a tour guide.
          </p>
        </motion.div>
      </section>

      {/* Tour Packages Section */}
      <section className="max-w-[25rem] md:max-w-2xl lg:max-w-7xl mx-auto py-16">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl text-blue-500 font-semibold mb-8">
            Our Tour Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-[#F4E3CF] shadow-lg p-4 md:p-4 lg:p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Beach Paradise</h3>
              <p className="mt-4">
                Relax on the pristine beaches and enjoy luxury.
              </p>
            </div>
            <div className="bg-[#F4E3CF] shadow-lg p-4 rounded-lg">
              <h3 className="text-xl font-semibold">Mountain Adventure</h3>
              <p className="mt-4">
                Experience thrilling hikes and mountain views.
              </p>
            </div>
            <div className="bg-[#F4E3CF] shadow-lg p-4 rounded-lg">
              <h3 className="text-xl font-semibold">Cultural Tour</h3>
              <p className="mt-4">
                Discover the rich history and traditions of local cultures.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Safety Section */}
      <section className=" bg-[#F4E3CF] py-16">
        <motion.div
          className="container mx-auto p-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl text-blue-500 font-semibold mb-8">
            Your Safety is Our Priority
          </h2>
          <p className="text-lg max-w-4xl text-blue-500 mx-auto">
            We ensure that all our tours prioritize your safety with top-rated
            guides, secure transport, and emergency preparedness.
          </p>
        </motion.div>
      </section>

      {/* <section className="py-16">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            Meet Our Tour Guides
          </h2>
          <p className="text-lg max-w-4xl mx-auto mb-8">
            Our experienced guides are passionate about sharing their knowledge
            and ensuring you have an unforgettable experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="mt-4">
                Expert in mountain tours with 10+ years of experience.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="mt-4">
                Passionate about cultural tours and history.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Emily Davis</h3>
              <p className="mt-4">
                Specializes in beach and tropical island tours.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="bg-blue-600 text-white py-16">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            Become a Tour Guide
          </h2>
          <p className="text-lg max-w-4xl mx-auto mb-8">
            Join our team and share your passion for travel by becoming a
            certified tour guide.
          </p>
          <a
            href="/become-a-tour-guide"
            className="inline-block bg-white text-blue-600 py-2 px-6 rounded-lg text-lg font-semibold"
          >
            Apply Now
          </a>
        </motion.div>
      </section> */}
    </div>
  );
};

export default AboutUs;
