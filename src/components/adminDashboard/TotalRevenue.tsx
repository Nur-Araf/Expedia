import { TrendingUp, TrendingDown, EqualApproximately } from "lucide-react";
import { Box } from "@mui/material";
import Breadcrumb from "../shareComponents/Breadcrumb";
import ExpectedRevenueChart from "./Charts/ExpectedRevenueChart";
import StatsCard from "./StatsCard";
import RevenueChart from "./Charts/RevenueChart";
import React from "react";

const TotalRevenue = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Breadcrumb pageName="Total Revenue" />
      <div className="p-4 md:p-6 2xl:p-10">
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <StatsCard
            title="Revenue"
            total="$12,345"
            rate="+15%"
            trend="up"
            icon={<TrendingUp size={24} className="text-green-500" />}
          />
          <StatsCard
            title="Visits"
            total="12,345"
            rate="+1%"
            trend="up"
            icon={<EqualApproximately size={24} className="text-green-700" />}
          />
          <StatsCard
            title="New Purchases"
            total="345"
            rate="-12%"
            trend="down"
            icon={<TrendingDown size={24} className="text-green-500" />}
          />
          <StatsCard
            title="Lost Purchases"
            total="$12,345"
            rate="-15%"
            trend="down"
            icon={<TrendingDown size={24} className="text-green-500" />}
          />
        </Box>
        <RevenueChart />
        <ExpectedRevenueChart />
      </div>
    </div>
  );
};
// bg-gradient-to-t from-[#8c9eff] via-[#b0bec5] to-[#cfd8dc]
// #0a66c2 #00A0DC bg-gradient-to-bl hover:bg-opacity-80
export default TotalRevenue;
