import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", expected: 4000, current: 3500 },
  { name: "Feb", expected: 5000, current: 4200 },
  { name: "Mar", expected: 6000, current: 5800 },
  { name: "Apr", expected: 7000, current: 6200 },
  { name: "May", expected: 8000, current: 7500 },
];

export default function ExpectedRevenueChart() {
  return (
    <div className="p-4 bg-gradient-to-l from-[#5c6bc0] to-[#7e8ac9] border mt-5 rounded-2xl shadow-lg">
      <h2 className="text-xl text-gray-700 font-semibold mb-4">
        Expected vs Current Revenue
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis type="number" stroke="#CBD5E0" />
          <YAxis dataKey="name" type="category" stroke="#CBD5E0" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A202C",
              borderRadius: "8px",
              border: "1px solid #4A5568",
              color: "#E2E8F0",
            }}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />
          <Legend wrapperStyle={{ color: "#E2E8F0" }} />
          <Bar
            dataKey="expected"
            fill="#4F46E5"
            name="Expected Revenue"
            radius={[0, 10, 10, 0]}
          />
          <Bar
            dataKey="current"
            fill="#22C55E"
            name="Current Revenue"
            radius={[0, 10, 10, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
