import { motion } from "framer-motion";
import useFetchData from "../../../hooks/GetData";
import { useNavigate } from "react-router-dom";

const GuidList = () => {
  const navigate = useNavigate();
  const { data: AllGuide = [] } = useFetchData(
    ["AllGuide"],
    `/api/tour-guides`
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-blue-500 text-3xl font-semibold hover:underline mb-6">
        Tour Guides
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {AllGuide.map((guide) => (
          <motion.div
            key={guide._id}
            onClick={() => navigate(`/tourGuides/${guide._id}`)}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
            }}
            className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={guide.image}
              alt={guide.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg text-blue-500 font-semibold mb-2">
                {guide.name}
              </h2>
              <p className="text-sm font-medium text-gray-900 mb-1">
                <strong>Specialization:</strong> {guide.specialization}
              </p>
              <p className="text-sm tfont-medium text-gray-900 mb-1">
                <strong>Experience:</strong> {guide.experience} years
              </p>
              <p className="text-sm font-medium text-gray-900">
                <strong>Rating:</strong> {guide.rating} ⭐
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GuidList;
