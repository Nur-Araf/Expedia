import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../providers/AuthProvider";
import useFetchData from "../../hooks/GetData";
import { useTable } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/AxiosSecure";
import Swal from "sweetalert2";
import Breadcrumb from "../shareComponents/Breadcrumb";

const TouristBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: allBookings = [], refetch } = useFetchData(
    ["allBookings"],
    `/api/booking/${user.email}`
  );
  const navigate = useNavigate();

  // Check if the length of allBookings is exactly 3
  const isThreeBookings = allBookings.length >= 3;

  // Map _id to id for uniform access
  const mappedBookings = allBookings.map((booking) => ({
    ...booking,
    id: booking._id,
  }));

  const columns = React.useMemo(
    () => [
      { Header: "Package Name", accessor: "placeId" },
      { Header: "Tour Guide", accessor: "tourGuide" },
      {
        Header: "Tour Date",
        accessor: "tourDate",
        Cell: ({ value }) => new Date(value).toISOString().split("T")[0],
      },
      { Header: "Price", accessor: "price", Cell: ({ value }) => `€${value}` },
      {
        Header: "Status",
        accessor: "isPending",
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              value === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : value === "In-Review"
                ? "bg-green-200 text-green-800"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            {value === "Pending"
              ? "Pending"
              : value === "In-Review"
              ? "In-Review"
              : "Confirmed"}
          </span>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            {row.original.isPending === "Pending" ? (
              <>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600"
                  onClick={() => navigate(`/payment/${row.original.id}`)}
                >
                  Pay
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600"
                  onClick={() => handleCancel(row.original.id)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600">
                {row.original.isPending === "In-Review"
                  ? "Paid Already"
                  : "Confirmed"}
              </button>
            )}
          </div>
        ),
      },
    ],
    [navigate]
  );

  const data = React.useMemo(() => mappedBookings, [mappedBookings]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you want to cancel this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/booking/cancel/${id}`)
          .then(() => {
            refetch();
            Swal.fire(
              "Canceled!",
              "Your booking has been canceled.",
              "success"
            );
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (allBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-blue-500 text-lg font-semibold">
          No Bookings Found.
        </p>
        <Link
          to={"/trips"}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform"
        >
          Book Now
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb pageName="Bookings"/>
      <div className="p-4 lg:p-6 bg-[#F4E3CF] rounded-lg min-h-[80dvh] m-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Bookings
        </h1>

        {/* Display special message if there are exactly 3 bookings */}
        {isThreeBookings && (
          <div className="text-center mb-4 text-lg font-semibold text-green-600">
            You have exactly 3 bookings! Pay for discount.
          </div>
        )}

        <div className="hidden md:block overflow-x-auto">
          <table
            {...getTableProps()}
            className="table-auto w-full bg-white shadow-lg rounded-lg border-collapse border border-gray-300"
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr
                  key={`header-${index}`}
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-gradient-to-r bg-blue-500 from-blue-600 to-indigo-600 text-white"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      className="text-left px-4 py-3 text-sm font-medium uppercase tracking-wide"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    key={`row-${row.id}`}
                    {...row.getRowProps()}
                    className="hover:bg-gray-100 border-b border-gray-300"
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={`cell-${cell.column.id}-${row.id}`}
                        {...cell.getCellProps()}
                        className="py-1 px-[2px] lg:px-4 lg:py-2 text-gray-700 text-sm"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden mt-6">
          {mappedBookings.map((booking, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow border border-gray-300"
            >
              <p className="text-lg font-semibold text-gray-800">
                Package: {booking.placeId}
              </p>
              <p className="text-sm text-gray-600">
                Tour Guide: {booking.tourGuide}
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(booking.tourDate).toISOString().split("T")[0]}
              </p>
              <p className="text-sm text-gray-600">Price: €{booking.price}</p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    booking.isPending === "Pending"
                      ? "text-yellow-600"
                      : booking.isPending === "In-Review"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {booking.isPending === "Pending"
                    ? "Pending"
                    : booking.isPending === "In-Review"
                    ? "In-Review"
                    : "Confirmed"}
                </span>
              </p>
              {booking.isPending === "Pending" ? (
                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 w-full"
                    onClick={() => navigate(`/payment/${booking.id}`)}
                  >
                    Pay
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 w-full"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 w-full">
                  {booking.isPending === "In-Review"
                    ? "Paid Already"
                    : "Confirmed"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TouristBookings.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.string.isRequired,
      isPending: PropTypes.bool.isRequired,
    }),
  }),
};

export default TouristBookings;
