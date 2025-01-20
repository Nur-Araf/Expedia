import React, { useState } from "react";
import { useTable } from "react-table";
import useFetchData from "../../hooks/GetData";

const TotalGuides = () => {
  const { data: guides = [] } = useFetchData(["guides"], `/api/tour-guides`);
  const [showAll, setShowAll] = useState(false);

  const displayedGuides = showAll ? guides : guides.slice(0, 3);

  // Columns for the React Table
  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image", // Make sure the image URL is correct in your data
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <img
            src={value}
            alt="Guide"
            className="w-8 h-8 object-cover rounded-full"
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: guides,
    });

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold mb-4">
        Total Guides: {guides.length}
      </div>

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
        {displayedGuides.map((guide) => (
          <div
            key={guide._id}
            className="mb-4 p-4 bg-[#F4E3CF] rounded-lg shadow border space-y-2 border-gray-300"
          >
            <img
              src={guide.image}
              alt={guide.name}
              className="w-16 h-16 object-cover rounded"
            />
            <p className="text-lg font-semibold text-gray-800 mb-0">
              {guide.name}
            </p>
            <p className="text-sm text-gray-600">{guide.email}</p>
          </div>
        ))}

        {/* See More Button for Mobile */}
        {guides.length > 3 && (
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

export default TotalGuides;
