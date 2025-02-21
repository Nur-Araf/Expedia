import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      text: "Amazing tour! The guide was incredibly knowledgeable and friendly. Highly recommend!",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4.5,
      text: "Beautiful scenery and well-organized itinerary. The food was delicious too!",
    },
    {
      id: 3,
      name: "David Lee",
      rating: 5,
      text: "Exceeded my expectations! The tour was a once-in-a-lifetime experience.",
    },
    {
      id: 4,
      name: "Sarah Jones",
      rating: 4.8,
      text: "The tour guide was very informative and passionate about the history of the area.",
    },
    {
      id: 5,
      name: "Michael Brown",
      rating: 5,
      text: "I had a fantastic time on this tour! The scenery was breathtaking.",
    },
    {
      id: 6,
      name: "Emily Davis",
      rating: 4.7,
      text: "The tour was well-organized and the pace was perfect. I would definitely recommend it to others.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.5 });

  return (
    <section className="py-16 min-h-[90dvh] flex items-center bg-gray-100 dark:bg-gradient-to-tr dark:from-gray-400 dark:to-gray-800">
      <div className="max-w-[25rem] md:max-w-2xl lg:max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          What Our Customers Say
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          ref={ref}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: (review.id - 1) * 0.2 }}
              className="bg-[#F4E3CF] rounded-lg p-6 shadow-md"
            >
              <p className="text-lg font-semibold mb-2">{review.name}</p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 ${
                      i < review.rating ? "text-yellow-500" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
