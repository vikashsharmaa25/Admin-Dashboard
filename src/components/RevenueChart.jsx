/**
 * RevenueChart component displays a line chart representing current and previous week revenue.
 * 
 * @component
 * @param {Object} props - The props for the RevenueChart component.
 * @param {string} props.theme - The current theme of the application ("light" or "dark").
 * 
 * @returns {JSX.Element} The rendered RevenueChart component.
 */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Data for the revenue chart.
const data = [
  { name: "Jan", current: 12000, previous: 7000 },
  { name: "Feb", current: 8000, previous: 17000 },
  { name: "Mar", current: 7000, previous: 18000 },
  { name: "Apr", current: 15000, previous: 10000 },
  { name: "May", current: 19000, previous: 11000 },
  { name: "Jun", current: 20000, previous: 23000 },
];

const RevenueChart = ({ theme }) => {
  const currentWeekRevenue = 58211;
  const previousWeekRevenue = 68768;

  const chartContainerClass = theme === "light" ? "bg-[#F7F9FB] bg-opacity-60" : "bg-[#282828] bg-opacity-80";
  const textClass = theme === "light" ? "text-[#1C1C1C]" : "text-gray-300";
  const currentWeekLineColor = theme === 'dark' ? '#C6C7F8' : '#1C1C1C';

  // Animation variants for the container element.
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual item elements.
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={`${chartContainerClass} rounded-3xl border dark:border-none w-full max-w-7xl mx-auto`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-3 sm:p-4 md:p-6 font-inter">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-7 justify-start mb-5"
          variants={itemVariants}
        >
          <h2 className={`text-sm md:text-base font-semibold ${textClass}`}>
            Revenue
          </h2>
          <div className="hidden sm:block border h-4"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <AnimatePresence>
              <motion.div
                className="flex items-center text-xs sm:text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${theme === "dark" ? "bg-[#C6C7F8]" : "bg-[#1C1C1C]"}`}></div>
                <span className={`font-normal ${textClass}`}>Current Week</span>
                <span className="ml-2 font-semibold">
                  ${currentWeekRevenue.toLocaleString()}
                </span>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              <motion.div
                className="flex items-center text-xs sm:text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-2 h-2 bg-[#A8C5DA] rounded-full mr-2"></div>
                <span className={`font-normal ${textClass}`}>
                  Previous Week
                </span>
                <span className="ml-2 font-semibold">
                  ${previousWeekRevenue.toLocaleString()}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="w-full h-[200px] sm:h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <Tooltip />
              <defs>
                <filter id="shadow" height="200%">
                  <feGaussianBlur
                    in="SourceAlpha"
                    stdDeviation="3"
                    result="blur"
                  />
                  <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
                  <feMerge>
                    <feMergeNode in="offsetBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <Line
                type="monotone"
                dataKey="current"
                stroke={currentWeekLineColor}
                strokeWidth={2}
                dot={false}
                strokeDasharray="4 4"
                filter="url(#shadow)"
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#93C5FD"
                strokeWidth={2}
                dot={false}
                filter="url(#shadow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
