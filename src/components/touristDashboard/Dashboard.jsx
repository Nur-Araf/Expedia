import { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaUser, FaRegListAlt, FaBars, FaTimes } from "react-icons/fa"; 
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineAutoStories } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  // State to manage sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[93dvh]">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-32 md:w-64" : "w-14 md:w-16"
        } transition-all duration-300 bg-[#F4E3CF] bg-opacity-60 text-blue-500 p-4 h-full`}
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
            to={"/dashboard/stories"}
            className={`${
              isSidebarOpen ? "flex" : "flex"
            } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
          >
            <MdOutlineAutoStories />
            {isSidebarOpen && <span className="ml-2">Stories</span>}
          </Link>

          <Link
            to={"/dashboard/add-atories"}
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

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
