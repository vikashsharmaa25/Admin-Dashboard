/**
 * Dashboard component displays various statistics and charts for the application.
 * It includes a stat card, revenue chart, projections chart, top-selling products, and total sales.
 *
 * This component utilizes Framer Motion for animations and accepts a themeClass prop to
 * apply styling based on the selected theme.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.themeClass - A string representing the CSS class for the current theme (e.g., "light" or "dark").
 *
 * @returns {JSX.Element} A rendered Dashboard component containing multiple data visualizations.
 *
 */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ProjectionsChart from "./ProjectionsChart";
import RevenueChart from "./RevenueChart";
import TopSellingProducts from "./TopSellingProducts";
import StatCard from "./StatCard";
import TotalSales from "./TotalSales";
import { motion } from "framer-motion";

// Array of product data representing the top-selling products.
const productData = [
  {
    key: "1",
    name: "ASOS Ridley High Waist",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    key: "2",
    name: "Marco Lightweight Shirt",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    key: "3",
    name: "Half Sleeve Shirt",
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    key: "4",
    name: "Lightweight Jacket",
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
  {
    key: "5",
    name: "Marco Shoes",
    price: 79.49,
    quantity: 64,
    amount: 1965.81,
  },
  {
    key: "6",
    name: "ASOS Ridley High Waist",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    key: "7",
    name: "Marco Lightweight Shirt",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    key: "8",
    name: "Half Sleeve Shirt",
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    key: "9",
    name: "Lightweight Jacket",
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
];

// Variants for the container animation in the product list.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Variants for individual item animations in the product list.
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

function Dashboard({ themeClass }) {
  return (
    <motion.div
      className={`min-h-screen p-2 sm:p-3 md:p-5 ${themeClass}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        <motion.div
          className={`sm:col-span-2 lg:col-span-3`}
          variants={itemVariants}
        >
          <StatCard theme={themeClass} />
        </motion.div>

        <motion.div
          className="sm:col-span-2 lg:col-span-2"
          variants={itemVariants}
        >
          <RevenueChart theme={themeClass} />
        </motion.div>

        <motion.div
          className="sm:col-span-2 lg:col-span-1"
          variants={itemVariants}
        >
          <ProjectionsChart theme={themeClass} />
        </motion.div>

        <motion.div
          className="sm:col-span-2 lg:col-span-2"
          variants={itemVariants}
        >
          <TopSellingProducts products={productData} theme={themeClass} />
        </motion.div>

        <motion.div
          className="sm:col-span-2 lg:col-span-1"
          variants={itemVariants}
        >
          <TotalSales theme={themeClass} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;