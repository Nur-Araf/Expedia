import { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { MdManageAccounts, MdOutlineSettingsApplications } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar
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
        className="hidden md:block text-xl md:text-2xl mb-4 text-blue-500 font-semibold md:font-bold focus:outline-none"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}{" "}
        {/* Icon for collapsing/expanding */}
      </button>

      {/* Sidebar Content */}
      <div className={`mt-4 md:mt-8 space-y-10`}>
        {/* Manage Profile Button */}
        <Link
          to={"/dashboard/admin-profile"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <FaUser />
          {isSidebarOpen && <span className="ml-2">Profile</span>}
        </Link>

        <Link
          to={"/dashboard/add-packages"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <SiGoogletagmanager />
          {isSidebarOpen && <span className="ml-2">Add Packages</span>}
        </Link>

        <Link
          to={"/dashboard/manage-users"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <MdManageAccounts />
          {isSidebarOpen && <span className="ml-2">Manage Users</span>}
        </Link>

        <Link
          to={"/dashboard/manage-candidates"}
          className={`${
            isSidebarOpen ? "flex" : "flex"
          } items-center space-x-2 md:space-x-4 text-blue-700 hover:text-blue-500 transition-colors text-sm md:text-base font-medium w-full`}
        >
          <MdOutlineSettingsApplications />
          {isSidebarOpen && <span className="ml-2">Manage Users</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
