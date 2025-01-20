import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const TouristRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Show a toast if the user is not a tourist
    if (!loading && user && userRole !== "Tourist") {
      toast.error("Access Denied: You are not a Tourist");
    }
  }, [loading, user, userRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary text-white"></span>
      </div>
    );
  }

  if (user && userRole === "Tourist") {
    return children;
  }

  return <Navigate to="/"></Navigate>;
};

export default TouristRoute;
