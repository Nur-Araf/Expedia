import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import useFetchData from "../../hooks/GetData";
import { Link } from "react-router-dom";
import { useState } from "react";

const Trips = () => {
  const { data: packages = [], isLoading } = useFetchData(
    ["packages"],
    "/api/packages",
    {
      refetchOnWindowFocus: true,
    }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  // Logic for pagination
  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-[#F4E3CF]">
      <div className="text-center md:mt-4 md:mb-5 lg:mt-8 mb-3 lg:mb-12">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">Popular Trips</h1>
        <p className="text-lg font-semibold text-blue-500 mb-2">
          Discover breathtaking destinations and unforgettable adventures
        </p>
      </div>

      {/* Trip Cards */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4 mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-70"></div>
          <p className="text-blue-500 text-lg font-semibold">
            Loading stories...
          </p>
        </div>
      ) : (
        <div className="container mx-auto p-2 lg:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {currentItems.map((packageItem) => (
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
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-lg text-white ${
              currentPage === index + 1
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Trips;
