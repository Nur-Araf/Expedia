import { useState } from "react";
import Select from "react-select";
import useFetchData from "../../hooks/GetData";

const ManageUsers = () => {
  const { data: initialUsers = [] } = useFetchData(["users"], `/users`);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: "Tourist", label: "Tourist" },
    { value: "Guide", label: "Guide" },
    { value: "Admin", label: "Admin" },
  ];

  // Filter users based on searchTerm and selectedRole
  const filteredUsers = initialUsers.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole ? user.role === selectedRole.value : true;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="md:p-4 max-w-[25rem] sm:max-w-[32rem] md:max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="border border-gray-300 p-2 rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          options={roleOptions}
          isClearable
          placeholder="Filter by Role"
          value={selectedRole}
          onChange={setSelectedRole}
          className="w-full md:w-1/2"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-200 px-4 py-2 hidden md:block">
                Name
              </th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center border border-gray-200 px-4 py-2"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 hidden md:block">
                    {user.name || "N/A"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.role || "User"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center border border-gray-200 px-4 py-2"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
