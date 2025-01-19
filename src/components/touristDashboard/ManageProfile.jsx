import { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase.init";

const ManageProfile = () => {
  const { user, userRole } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    updateProfile(auth.currentUser, {
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    })
      .then(() => {
        console.log("Profile updated successfully");
        setFormData({
          displayName: "",
          photoURL: "",
        });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error.message);
      });
  };

  return (
    <div className="lg:min-h-[80dvh]">
      <div className="p-4 sm:p-6 max-w-md sm:max-w-lg mx-auto bg-[#F4E3CF] shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500 text-center">
          Welcome, {user.displayName}!
        </h1>

        <div className="mt-6 flex flex-col items-center">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 border-blue-500 shadow-md"
          />

          <p className="mt-4 text-sm sm:text-base md:text-lg text-blue-500">
            Role: <span className="font-semibold">{userRole || "User"}</span>
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-6 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm sm:text-base md:text-lg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Edit Profile
          </button>

          {userRole === "Tourist" && (
            <Link
              to="/dashboard/join-as-tour-guide"
              className="mt-4 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-700  text-white text-sm sm:text-base md:text-lg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Apply For Tour Guide
            </Link>
          )}
        </div>

        {/* DaisyUI Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-11/12 sm:w-full max-w-md sm:max-w-lg p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                Edit Profile
              </h2>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-sm sm:text-base text-gray-700 font-medium"
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="photoURL"
                    className="block text-sm sm:text-base text-gray-700 font-medium"
                  >
                    Photo URL
                  </label>
                  <input
                    type="text"
                    id="photoURL"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm sm:text-base text-gray-700 font-medium"
                  >
                    Email (Read-only)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    readOnly
                    className="w-full p-2 sm:p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm sm:text-base text-gray-700 font-medium"
                  >
                    Role (Read-only)
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={user.role || "User"}
                    readOnly
                    className="w-full p-2 sm:p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-red-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProfile;
