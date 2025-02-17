import { Link } from "react-router";

const Breadcrumb = (pageName ) => {
  return (
    <div className="mb-6 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-gradient-to-l from-[#5c6bc0] to-[#cfd8dc]">
      <h2 className="text-2xl font-semibold text-black">{pageName}</h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};
export default Breadcrumb;
