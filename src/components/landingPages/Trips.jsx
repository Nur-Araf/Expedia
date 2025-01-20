import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import useFetchData from "../../hooks/GetData";
import { Link } from "react-router-dom";


const Trips = () => {
   const { data: packages = [] } = useFetchData(["packages"], "/api/packages");
   return (
     <div className="p-6 bg-[#F4E3CF]">
       <div className="text-center md:mt-4 md:mb-5 lg:mt-8 mb-3 lg:mb-12">
         <h1 className="text-4xl font-bold text-blue-500 mb-2">
           Popular Trips
         </h1>
         <p className="text-lg font-semibold text-blue-500 mb-2">
           Discover breathtaking destinations and unforgettable adventures
         </p>
       </div>
       <div className="container mx-auto p-2 lg:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
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
     </div>
   );
};

export default Trips;
