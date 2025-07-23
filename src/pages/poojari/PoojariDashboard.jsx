import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    TableRow,
    TableCell,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CommonTable from "../../components/DataTable";
import Loader from "../../components/Loader";

const summaryData = [
    {
        label: "Total Orders",
        count: 1823,
        icon: "/assets/total-orders.jpg",
        change: "+18%",
        color: "text-green-600",
    },
    {
        label: "Completed Orders",
        count: 1893,
        icon: "/assets/total-orders.jpg",
        change: "-11%",
        color: "text-red-500",
    },
    {
        label: "Pending Orders",
        count: 70,
        icon: "/assets/total-orders.jpg",
        change: "",
        color: "",
    },
];

const tableCellStyle = {
    fontSize: "15.29px",
    fontWeight: 500,
    lineHeight: "20.16px",
    color: "#292D32",
};

const orders = [
    {
        id: 1,
        name: "Set of 6 Diyas*4",
        poc: "Chanchal Gupta",
        pocNumber: "+91 78884 57441",
        email: "chanchal02@gmail.com",
        price: "1,200/-",
        status: "In Process",
        date: "2024-07-15",
        action: "",
    },
    {
        id: 2,
        name: "Handmade Incense Holder",
        poc: "Ravi Mehta",
        pocNumber: "+91 98765 43210",
        email: "ravi@example.com",
        price: "850/-",
        status: "Completed",
        date: "2024-07-18",
        action: "",
    },
    {
        id: 3,
        name: "Brass Pooja Thali",
        poc: "Anjali Verma",
        pocNumber: "+91 99887 77665",
        email: "anjali@example.com",
        price: "1,500/-",
        status: "Pending",
        date: "2024-07-20",
        action: "Accept",
    },
    {
        id: 4,
        name: "Camphor Diffuser",
        poc: "Karan Singh",
        pocNumber: "+91 91234 56789",
        email: "karan@example.com",
        price: "1,050/-",
        status: "Cancelled",
        date: "2024-07-10",
        action: "",
    },
];

const PoojariDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredOrders, setFilteredOrders] = useState([]);

    const headCells = useMemo(
        () => [
            { id: "sno", label: "S.No", minWidth: 40 },
            { id: "name", label: "Order Name", minWidth: 180 },
            { id: "poc", label: "POC", minWidth: 150 },
            { id: "pocNumber", label: "Contact", minWidth: 180 },
            { id: "email", label: "Email", minWidth: 200 },
            { id: "price", label: "Price", minWidth: 100 },
            { id: "action", label: "Action", sort: false },
            { id: "status", label: "Status", minWidth: 130 },
        ],
        []
    );

    const filterAndSortOrders = useCallback(() => {
        let updated = [...orders];
        if (search) {
            updated = updated.filter(
                (item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.poc.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (orderBy && order) {
            updated = updated.sort((a, b) =>
                order === "asc"
                    ? a[orderBy]?.localeCompare(b[orderBy])
                    : b[orderBy]?.localeCompare(a[orderBy])
            );
        }
        setTotalRecords(updated.length);
        setTotalPages(Math.ceil(updated.length / perPage));
        const paginated = updated.slice(
            currentPage * perPage,
            (currentPage + 1) * perPage
        );
        setFilteredOrders(paginated);
    }, [search, order, orderBy, currentPage]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            filterAndSortOrders();
            setLoading(false);
        }, 500);
    }, [filterAndSortOrders]);

    const handleAcceptOrder = (id) => {
        alert(`Accepted Order ID: ${id}`);
        // Future: Update status or call API
    };

    const renderRow = useCallback(
        (row, index) => (
            <TableRow key={row.id}>
                <TableCell sx={tableCellStyle}>{currentPage * perPage + index + 1}</TableCell>
                <TableCell sx={tableCellStyle}>{row.name}</TableCell>
                <TableCell sx={tableCellStyle}>{row.poc}</TableCell>
                <TableCell sx={tableCellStyle}>{row.pocNumber}</TableCell>
                <TableCell sx={tableCellStyle}>{row.email}</TableCell>
                <TableCell sx={tableCellStyle}>{row.price}</TableCell>
                <TableCell>
                    {row.action && (
                        <button
                            onClick={() => handleAcceptOrder(row.id)}
                            className="bg-orange-400 text-white text-xs px-2 py-1 rounded"
                        >
                            {row.action}
                        </button>
                    )}
                </TableCell>
                <TableCell>
                    <Box
                        sx={{
                            backgroundColor:
                                row.status === "Completed"
                                    ? "#C8E6C9"
                                    : row.status === "In Process"
                                        ? "#FFF9C4"
                                        : row.status === "Cancelled"
                                            ? "#FFCDD2"
                                            : "#E0E0E0",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            display: "inline-block",
                        }}
                    >
                        <Typography variant="body2" fontWeight={600} fontSize="0.75rem">
                            {row.status}
                        </Typography>
                    </Box>
                </TableCell>
            </TableRow>
        ),
        [currentPage, perPage]
    );

    const handlePageChange = (page) => setCurrentPage(page);

    const sortHandler = (property) => () => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    return (
        <Box className="flex flex-col lg:flex-row justify-between gap-6">
            {/* LEFT COLUMN */}
            <Box className="w-full lg:w-2/3 space-y-6">
                {/* Summary Cards */}
                <div className="flex flex-col sm:flex-row border border-[#e6a47e] rounded-2xl overflow-hidden sm:justify-between w-full bg-white">
                    {summaryData.map((item, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-center gap-3 px-4 py-3 w-full">
                                <div className="w-9 h-9 flex items-center justify-center bg-pink-100 rounded-full">
                                    <img src={item.icon} alt="icon" className="w-5 h-5 object-contain" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{item.label}</p>
                                    <p className="text-xl font-bold">{item.count.toLocaleString()}</p>
                                    {item.change && (
                                        <p className={`text-sm mt-1 flex items-center gap-1 ${item.color}`}>
                                            {item.change.includes("+") && <ArrowUpwardIcon fontSize="inherit" />}
                                            {item.change.includes("-") && <ArrowDownwardIcon fontSize="inherit" />}
                                            {item.change.replace(/[+-]/, "")}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Vertical Divider (only for desktop, not after last item) */}
                            {i < summaryData.length - 1 && (
                                <div
                                    className="hidden sm:block"
                                    style={{
                                        width: '1px',
                                        height: '40px',
                                        backgroundColor: '#e7dfdaff',
                                        alignSelf: 'center',
                                    }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>


                {/* Orders Table */}
                <Box className="bg-white border border-orange-200 rounded-xl shadow p-4 overflow-auto">
                    <Box className="flex flex-col lg:flex-row justify-between gap-3 mb-4">
                        <Typography variant="h6">All Orders</Typography>
                        <Box className="flex flex-col sm:flex-row gap-2 items-center">
                            <TextField
                                size="small"
                                variant="outlined"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearchTerm(val);
                                    setSearch(val);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" sx={{ color: "#7E7E7E" }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: searchTerm.length > 0 && (
                                        <InputAdornment position="end">
                                            <ClearIcon
                                                sx={{ color: "#7E7E7E", cursor: "pointer" }}
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    setSearch("");
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                    notched: false,
                                }}
                                sx={{
                                    backgroundColor: "#F9FBFF",
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { border: "none" },
                                        "&:hover fieldset": { border: "none" },
                                        "&.Mui-focused fieldset": { border: "none" },
                                    },
                                }}
                                className="w-full sm:w-[200px]"
                            />

                            <Box className="flex items-center gap-1">
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
                        </Box>
                    </Box>

                    {loading ? (
                        <Box className="flex justify-center items-center py-10">
                            <Loader />
                        </Box>
                    ) : (
                        <CommonTable
                            headCells={headCells}
                            createSortHandler={sortHandler}
                            loading={loading}
                            data={filteredOrders}
                            renderRow={renderRow}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            perPage={perPage}
                            orderBy={orderBy}
                            order={order}
                            component={null}
                            DataNotFoundTxt={"No data found"}
                            totalRecords={totalRecords}
                        />
                    )}
                </Box>
            </Box>

            {/* RIGHT COLUMN */}
            <Box className="flex flex-col gap-4 w-full lg:w-1/3 min-w-0">
                {/* Calendar */}
                <Box className="border border-orange-100 rounded-2xl p-2 bg-white">
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        className="react-calendar !border-none"
                    />
                </Box>

                {/* Events */}
                <Box className="bg-white border border-[#e6a47e] rounded-xl shadow p-4">
                    <Typography variant="subtitle1" fontWeight="bold">
                        Upcoming Events
                    </Typography>
                    <Box className="mt-3 space-y-3">
                        <Box className="flex items-center gap-2 flex-wrap">
                            <span className="bg-[#e77e23] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                20 Jan
                            </span>
                            <span>Festival Name</span>
                        </Box>
                        <Box className="flex items-center gap-2 flex-wrap">
                            <span className="bg-[#e77e23] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                29 Jan
                            </span>
                            <span>Festival Name</span>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PoojariDashboard;
