import React, { useState } from "react";
import { useTable } from "react-table";
import useFetchData from "../../hooks/GetData";

const TotalPayments = () => {
  const { data: paidBookings = [] } = useFetchData(
    ["paidBookings"],
    `/api/touristsPaidBookings`
  );
  const totalPrice = paidBookings.reduce((total, booking) => total + booking.price, 0);
  const [showAll, setShowAll] = useState(false);

  const data = React.useMemo(() => paidBookings, [paidBookings]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Tour Guide",
        accessor: "tourGuide",
      },
      {
        Header: "Transaction ID",
        accessor: "transactionId",
      },
      {
        Header: "Tour Place",
        accessor: "tourPlace",
      },
      {
        Header: "Tourist Name",
        accessor: "touristName",
      },
      {
        Header: "Payment Euro €",
        accessor: "price",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const displayedBookings = showAll ? paidBookings : paidBookings.slice(0, 3);

  return (
    <div className="p-4 mt-4">
      <h1 className="text-2xl font-semibold mb-2 md:mb-4">Paid Bookings</h1>
      <h2 className="text-lg font-medium mb-2 md:mb-4">
        Total Amount {totalPrice}
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block mt-6">
        <table
          {...getTableProps()}
          className="min-w-full border-collapse border border-gray-300"
        >
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps()}
                    className="border border-gray-300 px-4 py-2 text-left"
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
                  key={row.id}
                  {...row.getRowProps()}
                  className="even:bg-gray-100 odd:bg-white"
                >
                  {row.cells.map((cell) => (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className="border border-gray-300 px-4 py-2"
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
        {displayedBookings.map((booking, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-[#F4E3CF] rounded-lg shadow border border-gray-300"
          >
            <p className="text-lg font-semibold text-gray-800">
              Tour Guide: {booking.tourGuide}
            </p>
            <p className="text-sm text-gray-600">
              Transaction ID: {booking.transactionId}
            </p>
            <p className="text-sm text-gray-600">
              Tour Place: {booking.tourPlace}
            </p>
            <p className="text-sm text-gray-600">
              Tourist Name: {booking.touristName}
            </p>
            <p className="text-sm text-gray-600">Payment: €{booking.price}</p>
            <p className="text-sm text-gray-600">Email: {booking.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalPayments;
