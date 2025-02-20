import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const revenueData = {
  monthly: [
    { name: "Jan", revenue: 5000 },
    { name: "Feb", revenue: 7000 },
    { name: "Mar", revenue: 6500 },
    { name: "Apr", revenue: 8000 },
    { name: "May", revenue: 9500 },
    { name: "Jun", revenue: 11000 },
    { name: "Jul", revenue: 10500 },
    { name: "Aug", revenue: 12000 },
    { name: "Sep", revenue: 13000 },
    { name: "Oct", revenue: 11500 },
    { name: "Nov", revenue: 14000 },
    { name: "Dec", revenue: 15000 },
  ],
  weekly: [
    { name: "Week 1", revenue: 1200 },
    { name: "Week 2", revenue: 1500 },
    { name: "Week 3", revenue: 1300 },
    { name: "Week 4", revenue: 1800 },
    { name: "Week 5", revenue: 1750 },
    { name: "Week 6", revenue: 1900 },
    { name: "Week 7", revenue: 2100 },
  ],
};

const RevenueChart = () => {
  const [view, setView] = useState("monthly");

  return (
    <div className="dark:bg-gray-800 rounded-lg border bg-gradient-to-l from-[#5c6bc0] to-[#7e8ac9] p-5 shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-gray-700 text-xl font-semibold dark:text-white">
          Revenue Overview
        </h2>
        <div className="space-x-2">
          <button
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
              view === "monthly"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
          <button
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
              view === "weekly"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setView("weekly")}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData[view]}>
            {/* Gradient Effect */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3C50E0" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3C50E0" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "6px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "10px",
              }}
            />
            <Legend verticalAlign="top" align="right" />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#colorRevenue)"
              strokeWidth={3}
              dot={{ stroke: "#3C50E0", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
