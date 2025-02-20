import PropTypes from "prop-types";


const StatsCard = ({ title, total, rate, trend, icon }) => {
  return (
    <div className="rounded-lg border bg-gradient-to-r from-[#5c6bc0] to-[#7e8ac9] p-6 shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
        {icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-xl font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {title}
          </span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm bg-gray-200 px-2 py-1 rounded-2xl font-medium ${
            trend === "up"
              ? "text-green-500"
              : trend === "down"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {rate}
          {trend === "up" && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 10 10"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 0L10 5H0L5 0Z" />
            </svg>
          )}
          {trend === "down" && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 10 10"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 10L0 5H10L5 10Z" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;

StatsCard.propTypes = {
  title: PropTypes.string,
  total: PropTypes.string,
  rate: PropTypes.string,
  trend: PropTypes.oneOf(["up", "down"]),
  icon: PropTypes.node,
};