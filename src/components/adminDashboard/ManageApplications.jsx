import useFetchData from "../../hooks/GetData";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { toast } from "react-toastify";

const ManageApplications = () => {
  const { data: applications = [], refetch } = useFetchData(
    ["applications"],
    `/api/allApplications`
  );
  const axiosSecure = useAxiosSecure();

  // Handler for accepting an application
  const handleAccept = async (id, email) => {
    console.log(id, email);
    try {
      // Update user role with the email, not ID
      await axiosSecure.patch(`/api/users/${email}`, { role: "Guide" });

      // Refetch applications to update the UI
      await axiosSecure.delete(`/api/application/${id}`);
      refetch();
      toast.success("Application accepted and user role updated!");
    } catch (error) {
      console.error("Error accepting application:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Handler for rejecting an application
  const handleReject = async (id) => {
    try {
      // Delete the application
      await axiosSecure.delete(`/api/application/${id}`).then(() => {
        // Refetch applications to update the UI
        refetch();
        toast.success("Application rejected and deleted!");
      });
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Manage Applications
      </h1>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-[#F4E3CF] p-4 border rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{app.name}</h2>
              <p className="text-sm text-gray-500 mb-1">Email: {app.email}</p>
              <p className="text-sm text-gray-500 mb-1">Title: {app.title}</p>
              <p className="text-sm text-gray-500 mb-1">Reason: {app.reason}</p>
              <div className="mb-4">
                <a
                  href={app.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View CV
                </a>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleAccept(app._id, app.email)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(app._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageApplications;
