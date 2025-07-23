import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  TableRow,
  TableCell,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ClearIcon from "@mui/icons-material/Clear";

import CommonTable from "../../components/DataTable";
import Loader from "../../components/Loader";
import useDebounce from "../../hooks/useDebounce";

const summaryData = [
  {
    label: "Total Orders",
    count: 1823,
    change: "+16% this month",
    color: "text-green-600",
    icon: "/assets/total-orders.jpg",
  },
  {
    label: "Completed Orders",
    count: 1893,
    change: "-1% this month",
    color: "text-red-500",
    icon: "/assets/total-orders.jpg",
  },
  {
    label: "Pending Orders",
    count: 70,
    change: "",
    color: "text-gray-600",
    icon: "/assets/total-orders.jpg",
  },
];

// Extended with createdAt field for date sorting
const orders = [
  {
    id: 1,
    name: "Set of 6 Diyas*4",
    landline: "04",
    poc: "Chanchal Gupta",
    pocNumber: "+91 78884 57441",
    email: "chanchal02@gmail.com",
    price: "1,200/-",
    status: "In Process",
    action: "",
    createdAt: "2025-07-22T10:12:00",
  },
  {
    id: 2,
    name: "Diyas*6, Pooja Thali, Flower Garland",
    landline: "10",
    poc: "Krish Kunch",
    pocNumber: "+91 78884 57441",
    email: "krish119@yahoo.com",
    price: "4,120/-",
    status: "Waiting",
    action: "Accept",
    createdAt: "2025-07-21T14:30:00",
  },
  {
    id: 3,
    name: "Pooja Combo",
    landline: "01",
    poc: "Pramod Gunti",
    pocNumber: "+91 78884 57441",
    email: "gunti098@gmail.com",
    price: "3,400/-",
    status: "Rejected",
    action: "",
    createdAt: "2025-07-19T09:00:00",
  },
  {
    id: 4,
    name: "Amavas Combo",
    landline: "03",
    poc: "Tarun",
    pocNumber: "+91 95884 45571",
    email: "tarun1976@gmail.com",
    price: "1,670/-",
    status: "In Process",
    action: "",
    createdAt: "2025-07-18T12:15:00",
  },
  {
    id: 5,
    name: "Red Thread, Roli",
    landline: "04",
    poc: "Jeffry",
    pocNumber: "+91 72075 84451",
    email: "Jeffry03@gmail.com",
    price: "980/-",
    status: "Accepted",
    action: "",
    createdAt: "2025-07-20T16:45:00",
  },
];

const headCells = [
  { id: "sno", label: "Order No.", minWidth: 150 },
  { id: "name", label: "Item Name", minWidth: 180 },
  { id: "landline", label: "Item Qt.", minWidth: 130 },
  { id: "price", label: "Final Price", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "poc", label: "Customer Name", minWidth: 200 },
  { id: "pocNumber", label: "Phone Number", minWidth: 180 },
  { id: "action", label: "Action", sort: false, minWidth: 100 },
  { id: "status", label: "Status", minWidth: 120 },
];


const PoojaStoreDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState(""); // NEW

  const perPage = 5;

  const debouncedSearch = useDebounce((val) => {
    setSearch(val);
    setCurrentPage(0);
  }, 600);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, orderBy, order, currentPage]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const createSortHandler = useCallback(
    (property) => () => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const filteredOrders = useMemo(() => {
    let filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(search.toLowerCase()) ||
        order.poc.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOption) {
      filtered.sort((a, b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        return sortOption === "newest" ? bDate - aDate : aDate - bDate;
      });
    } else if (orderBy) {
      filtered.sort((a, b) => {
        const aVal = a[orderBy] || "";
        const bVal = b[orderBy] || "";
        return order === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    return filtered;
  }, [search, orderBy, order, sortOption]);

  const paginatedData = useMemo(() => {
    const start = currentPage * perPage;
    return filteredOrders.slice(start, start + perPage);
  }, [filteredOrders, currentPage]);

  const renderRow = (row, index) => (
    <TableRow key={index}>
      <TableCell>{index + 1 + currentPage * perPage}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.landline}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.poc}</TableCell>
      <TableCell>{row.pocNumber}</TableCell>
      <TableCell>
        {row.action && (
          <button className="bg-orange-400 text-white text-xs px-2 py-1 rounded">
            {row.action}
          </button>
        )}
      </TableCell>
      <TableCell>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${row.status === "In Process"
            ? "bg-green-100 text-green-700"
            : row.status === "Waiting"
              ? "bg-gray-300 text-gray-700"
              : row.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : row.status === "Accepted"
                  ? "bg-green-200 text-green-800"
                  : row.status === "Delivered"
                    ? "bg-blue-100 text-blue-800"
                    : row.status === "Cancelled"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-100 text-gray-700"
            }`}
        >
          {row.status}
        </span>
      </TableCell>
    </TableRow>
  );

  return (
    <Box className="bg-white min-h-screen p-4 md:p-8 space-y-8">
      {loading && <Loader />}

      {/* Summary Cards */}
      <div>
        <div className="flex flex-col md:flex-row md:w-fit border border-[#e6a47e] rounded-2xl overflow-hidden">
          {summaryData.map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-3 px-6 py-4 border-b md:border-b-0 w-full">
                <div className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full">
                  <img src={item.icon} alt="icon" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-xl font-bold">{item.count.toLocaleString()}</p>
                  {item.change && (
                    <p className={`text-xs mt-0.5 flex items-center gap-1 ${item.color}`}>
                      {item.change.includes("+") && <ArrowUpwardIcon fontSize="inherit" />}
                      {item.change.includes("-") && <ArrowDownwardIcon fontSize="inherit" />}
                      {item.change.replace(/[+-]/, "")}
                    </p>
                  )}
                </div>
              </div>

              {/* Vertical Divider only between cards, desktop only */}
              {i < summaryData.length - 1 && (
                <div
                  className="hidden md:block"
                  style={{
                    width: "1px",
                    height: "50px",
                    backgroundColor: "rgba(236, 233, 231, 1)",
                    alignSelf: "center",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>


      {/* Table Section */}
      <Box className="bg-white border border-orange-300 rounded-xl shadow p-4 space-y-4 overflow-x-auto">
        <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Typography variant="subtitle1" className="font-bold text-black-700">
            All Orders
          </Typography>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <TextField
              size="small"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: "#7E7E7E" }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <ClearIcon
                      sx={{ cursor: "pointer", color: "#7E7E7E" }}
                      onClick={() => {
                        setSearchTerm("");
                        setSearch("");
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#F9FBFF", // soft background
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
              className="w-full sm:w-[200px]"
            />

            <Box className="flex items-center gap-1 sm:ml-2">
              <span className="text-sm text-gray-600">Sort by</span>
              <Select
                size="small"
                value={orderBy}
                onChange={(e) => {
                  setOrderBy(e.target.value);
                  setOrder("desc");
                }}
                className="w-[120px]"
              >
                <MenuItem value="date">Newest</MenuItem>
                <MenuItem value="name">Oldest</MenuItem>
              </Select>
            </Box>
          </div>
        </Box>

        <CommonTable
          headCells={headCells}
          createSortHandler={createSortHandler}
          loading={loading}
          data={paginatedData}
          renderRow={renderRow}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          totalRecords={filteredOrders.length}
          perPage={perPage}
          order={order}
          orderBy={orderBy}
          component={null}
          DataNotFoundTxt="No orders found"
        />
      </Box>

    </Box>
  );
};

export default PoojaStoreDashboard;
