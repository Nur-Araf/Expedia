import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TourGuideOverview = () => {
  const steps = [
    {
      id: 1,
      title: "Discover Destinations",
      description: "Explore breathtaking destinations tailored to your taste.",
      icon: "🌍",
    },
    {
      id: 2,
      title: "Plan Your Trip",
      description: "Customize your tour with personalized itineraries.",
      icon: "🗺️",
    },
    {
      id: 3,
      title: "Enjoy the Journey",
      description: "Embark on unforgettable adventures with expert guides.",
      icon: "🏞️",
    },
    {
      id: 4,
      title: "Connect with Nature",
      description: "Experience the beauty of nature from the comfort of your home.",
      icon: "🌳",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative w-full -mt-[6px] lg:h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="./Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full bg-black bg-opacity-40 px-6 py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-6">
          Discover Your Next Adventure
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mb-10">
          Let us guide you to the world’s most stunning destinations. Tailored
          just for you!
        </p>

        {/* Steps Cards */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl">{step.icon}</div>
              <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mt-3">
                {step.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <button className="mt-10 bg-blue-600 text-white text-lg py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default TourGuideOverview;
