import { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaUser, FaRegListAlt, FaBars, FaTimes } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { SiGoogletagmanager } from "react-icons/si";
import { Link } from "react-router-dom";

const TouristSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div
      className={`${
        isSidebarOpen ? "w-32 md:w-64" : "w-14 md:w-16"
      } transition-all duration-300 bg-[#F4E3CF] bg-opacity-60 text-blue-500 p-4 py-12`}
    >
      {/* Sidebar Toggle Button */}
      <button
        className="text-xl md:text-2xl mb-4 text-blue-500 font-semibold md:font-bold focus:outline-none"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}{" "}
        {/* Icon for collapsing/expanding */}
      </button>

      {/* Sidebar Content */}
      <div className={`mt-4 md:mt-8 space-y-10`}>
        {/* Manage Profile Button */}
        <Link
          to={"/dashboard/profile"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <FaUser />
          {isSidebarOpen && <span className="ml-2">Profile</span>}
        </Link>

        {/* My Bookings Button */}
        <Link
          to={"/dashboard/bookings"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <FaRegListAlt />
          {isSidebarOpen && <span className="ml-2">Bookings</span>}
        </Link>

        <Link
          to={"/dashboard/manage-stories"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <SiGoogletagmanager />
          {isSidebarOpen && <span className="ml-2">Manage Stories</span>}
        </Link>

        <Link
          to={"/dashboard/add-stories"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <IoIosAddCircle />
          {isSidebarOpen && <span className="ml-2">Add Stories</span>}
        </Link>

        <Link
          to={"/dashboard/join-as-tour-guide"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <BsPersonFillAdd />
          {isSidebarOpen && <span className="ml-2">Join as Tour Guide</span>}
        </Link>
      </div>
    </div>
  );
};

export default TouristSidebar;
