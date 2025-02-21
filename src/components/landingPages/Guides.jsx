import { useTrail, animated } from "@react-spring/web";
import useFetchData from "../../hooks/GetData";

const Guides = () => {
  const { data: guides = [] } = useFetchData(["guides"], "/api/tour-guides");

  // Trail animation for the cards
  const trail = useTrail(guides.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-tr dark:from-gray-400 dark:to-gray-800 py-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-5 md:mb-10 text-blue-700">
        Meet Our Expert Guides
      </h1>
      <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 px-5">
        {trail.map((style, index) => (
          <animated.div
            key={guides[index]._id}
            style={style}
            className="bg-[#F4E3CF] shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={guides[index].image}
              alt={guides[index].name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                {guides[index].name}
              </h2>
              <p className="text-blue-600 mb-1">
                <span className="font-semibold">Email:</span>{" "}
                {guides[index].email}
              </p>
              <p className="text-blue-600 mb-1">
                <span className="font-semibold">Specialization:</span>{" "}
                {guides[index].specialization}
              </p>
              <p className="text-blue-600 mb-1">
                <span className="font-semibold">Rating:</span> ⭐{" "}
                {guides[index].rating}
              </p>
              <p className="text-blue-600">
                <span className="font-semibold">Languages:</span>{" "}
                {guides[index].languages.join(", ")}
              </p>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Guides;
