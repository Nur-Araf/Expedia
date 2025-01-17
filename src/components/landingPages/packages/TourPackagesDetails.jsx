import { Link, useParams } from "react-router-dom";
import PackageDetails from "./PackageDetails";
import GuidList from "./GuidList";

const TourPackagesDetails = () => {
  const { id } = useParams();

  return (
    <div className="bg-[#F4E3CF] py-2 md:py-8">
      <PackageDetails id={id} />
      <div className="flex justify-center mt-6">
        <Link
          to={`/book/${id}`}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-blue-300 focus:outline-none mb-6"
        >
          📖 Book Now
        </Link>
      </div>
      <GuidList />
    </div>
  );
};

export default TourPackagesDetails;
