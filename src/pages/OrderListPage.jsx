/**
 * OrdersListPage renders a list of orders with selection, search, sorting, pagination, 
 * status filtering, and PDF download functionality. The component supports both light and dark themes, 
 * with smooth animations via Framer Motion.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.theme - The current application theme ("light" or "dark").
 * @param {Function} props.setLeftSidebarOpen - Toggles the visibility of the left sidebar.
 *
 * @returns {JSX.Element} The OrdersListPage component.
 */

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoFilterOutline } from "react-icons/io5";
import { TbArrowsDownUp } from "react-icons/tb";
import { FiSearch, FiCalendar } from "react-icons/fi";
import { PiClipboardText } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useReactToPrint } from "react-to-print";

const OrdersListPage = ({ theme, setLeftSidebarOpen }) => {

  const [data, setData] = useState([
    {
      key: "1",
      selected: false,
      orderID: "#CM9801",
      user: "Natali Craig",
      avatar: "/Images/NataliCraig.png",
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "In Progress",
    },
    {
      key: "2",
      selected: false,
      orderID: "#CM9802",
      user: "Kate Morrison",
      avatar: "/Images/KateMorrison.png",
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "Complete",
    },
    {
      key: "3",
      selected: false,
      orderID: "#CM9803",
      user: "Drew Cano",
      avatar: "/Images/DrewCano.png",
      project: "Client Project",
      address: "Bagwell Avenue Ocala",
      date: "1 hour ago",
      status: "Pending",
    },
    {
      key: "4",
      selected: true,
      orderID: "#CM9804",
      user: "Orlando Diggs",
      avatar: "/Images/OrlandoDiggs.png",
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "Approved",
    },
    {
      key: "5",
      selected: false,
      orderID: "#CM9805",
      user: "Andi Lane",
      avatar: "/Images/AndiLane.png",
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
    {
      key: "6",
      selected: false,
      orderID: "#CM9801",
      user: "Natali Craig",
      avatar: "/Images/NataliCraig.png",
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "In Progress",
    },
    {
      key: "7",
      selected: false,
      orderID: "#CM9802",
      user: "Kate Morrison",
      avatar: "/Images/KateMorrison.png",
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "Complete",
    },
    {
      key: "8",
      selected: false,
      orderID: "#CM9803",
      user: "Drew Cano",
      avatar: "/Images/DrewCano.png",
      project: "Client Project",
      address: "Bagwell Avenue Ocala",
      date: "1 hour ago",
      status: "Pending",
    },
    {
      key: "9",
      selected: false,
      orderID: "#CM9804",
      user: "Orlando Diggs",
      avatar: "/Images/OrlandoDiggs.png",
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "Approved",
    },
    {
      key: "10",
      selected: false,
      orderID: "#CM9805",
      user: "Andi Lane",
      avatar: "/Images/AndiLane.png",
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
    {
      key: "11",
      selected: false,
      orderID: "#CM9805",
      user: "Andi Lane",
      avatar: "/Images/AndiLane.png",
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
    {
      key: "12",
      selected: false,
      orderID: "#CM9805",
      user: "Andi Lane",
      avatar: "/Images/AndiLane.png",
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
    {
      key: "13",
      selected: false,
      orderID: "#CM9805",
      user: "Andi Lane",
      avatar: "/Images/AndiLane.png",
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const componentRef = useRef();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  /**
 * Triggers print for the order list using `useReactToPrint`, targeting the element 
 * referenced by `componentRef` and setting the document title to "Orders_List".
 *
 * @constant
 * @type {Function}
 */
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Orders_List",
  });

  /**
   * Toggles selection of all orders.
   *
   * @function handleSelectAllChange
   * @returns {void}
   */
  const handleSelectAllChange = useCallback(() => {
    setSelectAll((prev) => !prev);
    setData((prevData) =>
      prevData.map((item) => ({ ...item, selected: !selectAll }))
    );
  }, [selectAll]);

  /**
 * Toggles the selection of a specific order.
 *
 * @function handleCheckboxChange
 * @param {string} key - The key of the order item to toggle.
 * @returns {void}
 */
  const handleCheckboxChange = useCallback((key) => {
    setData((prevData) => {
      const newData = prevData.map((item) =>
        item.key === key ? { ...item, selected: !item.selected } : item
      );
      setSelectAll(newData.every((item) => item.selected));
      return newData;
    });
  }, []);

  /**
   * Handles sorting of table columns by the provided key.
   *
   * @function handleSort
   * @param {string} key - The key by which to sort the orders (e.g., 'orderID').
   * @returns {void}
   */
  const handleSort = useCallback((key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  }, []);

  /**
   * Handles the search input change event, updating the search term.
   *
   * @function handleSearch
   * @param {Event} e - The input change event.
   * @returns {void}
   */
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  /**
   * Handles the filtering of orders based on status.
   *
   * @function handleFilterChange
   * @param {string} status - The status to filter the orders by (e.g., 'Complete').
   * @returns {void}
   */
  const handleFilterChange = useCallback((status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  }, []);

  /**
   * Filters and sorts the order data based on the search term, filter status, and sort configuration.
   *
   * @constant {Array<Object>} filteredAndSortedData - The filtered and sorted list of orders.
   */
  const filteredAndSortedData = useMemo(() => {
    return data
      .filter(
        (item) =>
          (filterStatus === "All" || item.status === filterStatus) &&
          Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
      .sort((a, b) => {
        if (sortConfig.key) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        return 0;
      });
  }, [data, sortConfig, searchTerm, filterStatus]);

  /**
   * Calculates the total number of pages based on the filtered and sorted data.
   *
   * @constant {number} totalPages - The total number of pages for pagination.
   */
  const totalPages = useMemo(() => {
    return Math.ceil(filteredAndSortedData.length / itemsPerPage);
  }, [filteredAndSortedData.length, itemsPerPage]);

  /**
   * Slices the filtered and sorted data for pagination.
   *
   * @constant {Array<Object>} paginatedData - The paginated list of orders to display.
   */
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /**
 * Determines color scheme for a given order status.
 *
 * @function getStatusColor
 * @param {string} status - The current order status.
 * @returns {Object} - The text and dot color for the specified status.
 */
  const getStatusColor = (status) => {
    const statusColors = {
      "In Progress": { text: "#8A8CD9", dot: "#95A4FC" },
      Complete: { text: "#4AA785", dot: "#A1E3CB" },
      Pending: { text: "#59A8D4", dot: "#B1E3FF" },
      Approved: { text: "#FFC555", dot: "#FFE999" },
      Rejected: {
        text: theme === "dark" ? "#FFFFFF66" : "#1C1C1C66",
        dot: theme === "dark" ? "#FFFFFF66" : "#1C1C1C66",
      },
    };
    return statusColors[status] || { text: "#000", dot: "#000" };
  };

  /**
  * Effect to manage the sidebar's visibility on mount and unmount.
  *
  * @effect
  * @returns {void}
  */
  useEffect(() => {
    setLeftSidebarOpen(false);
    return () => {
      setLeftSidebarOpen(true);
    };
  }, [setLeftSidebarOpen]);

  // Variants for animating table rows.
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  // Variants for animating the search input field.
  const searchInputVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "auto", opacity: 1,
      transition: { duration: 0.3 }
    },
  };

  // Variants for animating button hover effects.
  const buttonHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-4 font-inter ${theme === "dark" ? "bg-[#1C1C1C] text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center">
        <div className="my-2 mb-4 mx-2 font-semibold text-sm">Order List</div>
        <div
          onClick={handlePrint}
          className={`text-sm font-inter font-normal px-4 py-1 rounded-lg cursor-pointer ${theme === "light" ? "text-[#1C1C1C] bg-[#1C1C1C0D]" : "text-[#FFFFFF] bg-[#FFFFFF1A]"}`}>
          Download pdf
        </div>
      </div>
      <div className={`flex justify-between items-center px-6 py-2 ${theme === "dark" ? "bg-[#FFFFFF0D]" : "bg-[#F7F9FB]"} rounded-lg mb-4`}>
        <div className="space-x-4">
          <motion.button
            whileHover="hover"
            variants={buttonHoverVariants}
            className="focus:outline-none hover:text-gray-600"
          >
            <AiOutlinePlus size={20} />
          </motion.button>

          <motion.button
            whileHover="hover"
            variants={buttonHoverVariants}
            className="focus:outline-none hover:text-gray-600"
          >
            <IoFilterOutline size={20} />
          </motion.button>

          <motion.button
            whileHover="hover"
            variants={buttonHoverVariants}
            className="focus:outline-none hover:text-gray-600"
          >
            <TbArrowsDownUp size={20} />
          </motion.button>

        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={searchInputVariants}
          className="relative float-right w-fit">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className={`float-right pl-9 pr-4 px-2 py-1 border ${theme === "light" ? "bg-white placeholder-[#1C1C1C33] border-[#1C1C1C1A]" : "bg-[#1C1C1C] placeholder-[#FFFFFF33] border-[#FFFFFF1A]"} font-inter rounded-lg focus:outline-none focus:ring-1 ${theme === "light" ? "focus:ring-gray-400" : "focus:ring-gray-500"
              }`}
          />
          <FiSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === "light" ? "text-[#1C1C1C33]" : "text-[#FFFFFF33]"}`}
            size={16}
          />
        </motion.div>
      </div>
      <div className="overflow-x-auto hide-scrollbar">
        <table ref={componentRef} className="min-w-full">
          <thead>
            <tr className={`${theme === "dark" ? "bg-[#FFFFFF0D] border-b border-[#FFFFFF1A] text-[#FFFFFF66]" : "bg-white text-[#1C1C1C66]"} border-b border-[#1C1C1C33]`}>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className={`h-4 w-4 border cursor-pointer ${theme === "dark" ? "border-[#FFFFFF33]" : "border-[#1C1C1C33]"}`}
                />
              </th>
              {["Order ID", "User", "Project", "Address", "Date", "Status"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left font-normal text-xs cursor-pointer"
                    onClick={() =>
                      handleSort(header.toLowerCase().replace(" ", ""))
                    }>
                    {header}
                    {sortConfig.key ===
                      header.toLowerCase().replace(" ", "") && (
                        <span>
                          {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                        </span>
                      )}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="">
            <AnimatePresence>
              {paginatedData.map((item) => (
                <motion.tr
                  variants={tableRowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={item.key}
                  whileHover="hover"
                  transition={{ duration: 0.3, delay: item.key * 0.05 }}
                  className={`${theme === "dark" ? "bg-[#1C1C1C] text-[#FFFFFF] border-b border-[#FFFFFF1A] hover:bg-[#282828]" : "bg-white text-[#1C1C1C] border-b border-[#1C1C1C0D] hover:bg-gray-100"}`}
                  onMouseEnter={() => setHoveredRow(item.key)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleCheckboxChange(item.key)}
                      className={`form-checkbox h-4 w-4 transition-opacity duration-300 ease-in-out ${item.selected ? "opacity-100 hover:border" : "hover:border-gray-500 hover:border duration-300 transition-transform cursor-pointer"}`}
                    />
                  </td>
                  <td className="px-6 py-4 text-xs font-normal">
                    {item.orderID}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs font-normal">
                      <img
                        src={item.avatar}
                        alt="user"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {item.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-normal">
                    {item.project}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs font-normal">
                      {item.address}
                      <PiClipboardText
                        size={16}
                        className={`ml-1 ${hoveredRow === item.key ? "visible" : "invisible"}`}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs font-normal">
                      <FiCalendar
                        size={16}
                        className="mr-1"
                      />
                      {item.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs font-normal">
                      <span
                        className="h-2 w-2 rounded-full mr-2"
                        style={{
                          backgroundColor: getStatusColor(item.status).dot,
                        }}
                      ></span>
                      <span style={{ color: getStatusColor(item.status).text }}>
                        {item.status}
                      </span>
                      <div className={`${hoveredRow === item.key ? "visible" : "invisible"}`}>
                        <IoIosMore
                          size={16}
                          className="ml-5"
                        />
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 mb-2">
        <div>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className={`font-inter font-normal text-sm px-2 py-2 border rounded-lg ${theme === "dark"
              ? "bg-[#1C1C1C] text-white border-[#FFFFFF1A]"
              : "text-[#1C1C1C] bg-[#1C1C1C0D]"
              }`}>
            {[10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1 ? "opacity-50" : ""
              }`}>
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-lg ${theme === "dark"
                ? currentPage === index + 1
                  ? "bg-[#FFFFFF1A] text-white"
                  : "bg-transparent text-gray-300 hover:bg-[#FFFFFF1A] hover:text-white"
                : currentPage === index + 1
                  ? "bg-[#1C1C1C0D] text-black"
                  : "bg-transparent text-[#1C1C1C] hover:bg-gray-200 hover:text-black"
                }`}>
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? "opacity-50" : ""}`}>
            &gt;
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersListPage;