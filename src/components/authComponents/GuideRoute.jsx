import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const GuideRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const userRole = localStorage.getItem("userRole");
  useEffect(() => {
    // Show a toast if the user is not a guide
    if (!loading && user && userRole !== "Guide") {
      toast.error("Access Denied: You are not a Guide");
    }
  }, [loading, user, userRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary text-white"></span>
      </div>
    );
  }

  if (user && userRole === "Guide") {
    return children;
  }

  // Redirect to the home page if not authorized
  return <Navigate to="/" />;
};

export default GuideRoute;
