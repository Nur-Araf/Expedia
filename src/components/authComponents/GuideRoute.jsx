import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

// eslint-disable-next-line react/prop-types
const GuideRoute = ({ children }) => {
  const { loading, user, userRole } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary text-white"></span>
      </div>
    );
  }

  if (user || userRole === "Guide") {
    return children;
  }

  return <Navigate to="/log-in"></Navigate>;
};

export default GuideRoute;
