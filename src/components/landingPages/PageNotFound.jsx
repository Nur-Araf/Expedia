
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default PageNotFound;
