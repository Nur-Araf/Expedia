import { Link } from "react-router-dom";
import { FaStar, FaSuitcase } from "react-icons/fa";
import useFetchData from "../../../hooks/GetData";

const TourGuide = () => {
  const { data: tourGuide = [] } = useFetchData(
    ["tourGuide"],
    "/api/tour-guides/random"
  );

  return (
    <div className="p-2 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {tourGuide.map((tourGuideItem) => (
        <div
          key={tourGuideItem._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer group"
        >
          {/* Image Section */}
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
              src={tourGuideItem.image}
              alt={tourGuideItem.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 hover:bg-blue-50 transition-colors duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">
              {tourGuideItem.name}
            </h3>
            <p className="text-gray-600 mb-4">{tourGuideItem.specialization}</p>
            <div className="flex items-center mb-2 text-gray-600">
              <FaSuitcase className="mr-2 text-blue-500" />
              <span>{tourGuideItem.experience} years of experience</span>
            </div>
            <div className="flex items-center mb-4 text-gray-600">
              <FaStar className="mr-2 text-yellow-500" />
              <span>{tourGuideItem.rating} / 5</span>
            </div>
            <Link
              to={`/tourGuides/${tourGuideItem._id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourGuide;