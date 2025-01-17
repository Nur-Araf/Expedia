import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetchData from "../../../hooks/GetData";


const OurPackages = () => {
    const {
      data: packages = [],
    } = useFetchData(["packages"], "/api/packages/random");
  return (
    <div className="p-2 lg:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      {packages.map((packageItem) => (
        <div
          key={packageItem._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer group"
        >
          {/* Image Section */}
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
              src={packageItem.images[0]}
              alt={packageItem.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Content Section */}
          <div className="p-4 lg:p-6 hover:bg-blue-50 transition-colors duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">
              {packageItem.tripTitle}
            </h3>
            <p className="flex items-center text-gray-600 mb-2 group-hover:text-blue-500">
              <FaMapMarkerAlt className="mr-2 text-blue-600" />
              {packageItem.tourPlace}
            </p>
            <p className="text-gray-500 mb-4">{packageItem.tourType}</p>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-800 font-semibold group-hover:text-blue-700">
                <FaDollarSign className="mr-1 text-green-600" />
                {packageItem.price}
              </span>
              <Link
                to={`/packages/${packageItem._id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurPackages;
