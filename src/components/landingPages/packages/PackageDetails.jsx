import { Link } from "react-router-dom";
import useFetchData from "../../../hooks/GetData";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

// eslint-disable-next-line react/prop-types
const PackageDetails = ({ id }) => {
    const { data: AllPackage = [] } = useFetchData(
      ["AllPackage"],
      `/api/packages/${id}`
    );
  return (
    <div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-blue-700 font-bold text-center my-3 md:my-6">
        Welcome To {AllPackage.tourPlace}
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-blue-600 font-bold text-center mb-3 md:mb-6">
        {AllPackage.tripTitle}
      </p>
      <div className="container mx-auto px-4 py-8">
        {/* Gallery Section */}
        <div>
          <h2 className="text-center text-blue-500 text-3xl font-semibold hover:underline mb-6">
            Attractive Places
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {AllPackage.images?.map((image, index) => (
              <div
                key={index}
                className={`relative cursor-pointer rounded-md overflow-hidden shadow-lg transition-transform duration-300 ${
                  index % 4 === 0 || index % 4 === 1
                    ? "col-span-2 row-span-2 h-64 md:h-72 hover:scale-105"
                    : "h-48 hover:scale-105"
                }`}
              >
                <img
                  src={image}
                  alt={`Tour Image ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* About the Tour Section */}
        <div className="mt-8 max-w-2xl mx-auto">
          <h2 className="text-center text-blue-500 text-3xl font-semibold hover:underline mb-6">
            About the Tour
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="flex items-center text-lg font-medium text-gray-700">
                  <span className="text-blue-500 mr-2">📌</span>
                  <span className="font-semibold">Tour Type: </span>{" "}
                  {AllPackage.tourType}
                </p>
                <p className="flex items-center text-lg font-medium text-gray-700">
                  <span className="text-blue-500 mr-2">📍</span>
                  <span className="font-semibold">Place: </span>{" "}
                  {AllPackage.tourPlace}
                </p>
              </div>
              <div>
                <p className="flex items-center text-lg font-medium text-gray-700">
                  <span className="text-blue-500 mr-2">🏷️</span>
                  <span className="font-semibold">Title: </span>{" "}
                  {AllPackage.tripTitle}
                </p>
                <p className="flex items-center text-lg font-medium text-gray-700">
                  <span className="text-blue-500 mr-2">💡</span>
                  <span className="font-semibold">Price: </span>
                  <span className="text-green-600 font-bold">
                    ${AllPackage.price}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 leading-relaxed text-justify">
                {AllPackage.aboutTheTour}
              </p>
            </div>
            <div className="mt-6 text-center">
              <Link
                to={`/book/${id}`}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Tour Plan Section */}
        <div className="mt-8">
          <h2 className="text-center text-blue-500 text-3xl font-semibold hover:underline mb-6">
            Tour Plan
          </h2>
          <VerticalTimeline>
            {AllPackage.tourPlan?.map((plan, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#ffffff", color: "#000" }}
                contentArrowStyle={{ borderRight: "7px solid #007bff" }}
                iconStyle={{
                  background: "#007bff",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                icon={<span className="font-bold">{plan.day}</span>}
              >
                <h3 className="text-lg font-bold mb-2">Day {plan.day}</h3>
                <p>{plan.plan}</p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>

        <div className="mt-8"></div>
      </div>
    </div>
  );
};

export default PackageDetails;
