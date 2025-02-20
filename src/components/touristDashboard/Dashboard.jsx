import { Outlet } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";
import {
  MdManageAccounts,
  MdOutlineSettingsApplications,
} from "react-icons/md";
import MasterSidebar from "../shareComponents/MasterSidebar";
import { IoIosAddCircle } from "react-icons/io";
import { BsPersonFillAdd } from "react-icons/bs";

const Dashboard = () => {
  const { userRole } = useContext(AuthContext);
  const touristItems = [
    {
      name: "Profile",
      icon: <FaUser />,
      link: "/dashboard/profile",
    },
    {
      name: "Bookings",
      icon: <FaRegListAlt />,
      link: "/dashboard/bookings",
    },
    {
      name: "Stories",
      icon: <SiGoogletagmanager />,
      link: "/dashboard/manage-stories",
    },
    {
      name: "Add Stories",
      icon: <IoIosAddCircle />,
      link: "/dashboard/add-stories",
    },
    {
      name: "Join as Tour Guide",
      icon: <BsPersonFillAdd />,
      link: "/dashboard/join-as-tour-guide",
    },
  ];
  const guideItems = [
    {
      name: "Profile",
      icon: <FaUser />,
      link: "/dashboard/guide-profile",
    },
    {
      name: "Assigned Bookings",
      icon: <FaRegListAlt />,
      link: "/dashboard/assingned-bookings",
    },
    {
      name: "Stories",
      icon: <SiGoogletagmanager />,
      link: "/dashboard/manageGuide-stories",
    },
    {
      name: "Add Stories",
      icon: <IoIosAddCircle />,
      link: "/dashboard/addGuide-stories",
    },
  ];
  const adminItems = [
    {
      name: "Profile",
      icon: <FaUser />,
      link: "/dashboard/admin-profile",
    },
    {
      name: "Add Packages",
      icon: <SiGoogletagmanager />,
      link: "/dashboard/add-packages",
    },
    {
      name: "Users",
      icon: <MdManageAccounts />,
      link: "/dashboard/manage-users",
    },
    {
      name: "Applications",
      icon: <MdOutlineSettingsApplications />,
      link: "/dashboard/manage-candidates",
    },
  ];
  return (
    <div className="flex">
      {/* Sidebar for Tourist*/}
      {/* {userRole === "Tourist" && <TouristSidebar />} */}
      {userRole === "Tourist" && <MasterSidebar items={touristItems} />}
      {/* {userRole === "Guide" && <GuideSidebar />} */}
      {userRole === "Guide" && <MasterSidebar items={guideItems} />}
      {/* {userRole === "Admin" && <AdminSidebar />} */}
      {userRole === "Admin" && <MasterSidebar items={adminItems} />}

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
