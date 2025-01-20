import React, { useState } from "react";
import { useTable } from "react-table";
import useFetchData from "../../hooks/GetData";

const TotalPackages = () => {
  const { data: allPackages = [] } = useFetchData(
    ["allPackages"],
    `/api/packages`
  );
  const [showAll, setShowAll] = useState(false);

  const displayedPackages = showAll ? allPackages : allPackages.slice(0, 3);

  // Columns for React Table
  const columns = React.useMemo(
    () => [
      {
        Header: "Tour Place",
        accessor: "tourPlace",
      },
      {
        Header: "Price (€)",
        accessor: "price",
      },
      {
        Header: "Tour Type",
        accessor: "tourType",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: allPackages,
    });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Total Packages: {allPackages.length}
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
        {displayedPackages.map((pack) => (
          <div
            key={pack._id}
            className="mb-4 p-4 bg-[#F4E3CF] rounded-lg shadow border border-gray-300"
          >
            <p className="text-lg font-semibold text-gray-800">
              Tour Place: {pack.tourPlace}
            </p>
            <p className="text-sm text-gray-600">Price: €{pack.price}</p>
            <p className="text-sm text-gray-600">Tour Type: {pack.tourType}</p>
          </div>
        ))}

        {/* See More Button for Mobile */}
        {allPackages.length > 3 && (
          <button
            className="mt-4 text-blue-500"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TotalPackages;
