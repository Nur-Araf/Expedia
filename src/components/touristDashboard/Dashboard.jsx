import { Outlet } from "react-router-dom";
import TouristSidebar from "./TouristSidebar";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import GuideSidebar from "../guideDashboard/GuideSidebar";

const Dashboard = () => {
  const { userRole } = useContext(AuthContext);
  return (
    <div className="flex">
      {/* Sidebar for Tourist*/}
      {userRole === "Tourist" && <TouristSidebar />}
      {userRole === "Guide" && <GuideSidebar />}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
