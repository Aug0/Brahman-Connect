
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box, Typography, TextField, InputAdornment, MenuItem, Select, TableRow, TableCell, Button
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { FaRegEdit } from "react-icons/fa";
import CommonTable from "../../components/DataTable";
import Loader from "../../components/Loader";
import SEO from "../../components/SEO";

const tableCellStyle = {
  fontSize: "15.29px",
  fontWeight: 500,
  lineHeight: "20.16px",
  color: "#292D32",
};

const TABS = ['Temples', 'Poojaris', 'Pooja Stores'];

const summaryStats = [
  { label: 'Temples', count: '1,893', img: '/assets/temples.png' },
  { label: 'Poojaris', count: '461', img: '/assets/poojaris.png' },
  { label: 'Pooja Stores', count: '243', img: '/assets/pooja stores.png' }
];

const AgentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const headCells = useMemo(
    () => [
      { id: 'sno', label: 'S.No', minWidth: 40 },
      { id: 'templeName', label: 'Temple Name', minWidth: 180 },
      { id: 'landline', label: 'Landline Number', minWidth: 200 },
      { id: 'pocName', label: 'POC Name', minWidth: 150 },
      { id: 'pocNumber', label: 'POC Number', minWidth: 180 },
      { id: 'city', label: 'City, State', minWidth: 200 },
      { id: 'pincode', label: 'Pincode', minWidth: 100 },
      { id: 'action', label: 'Action', sort: false }
    ],
    []
  );

  const mockApiFetch = async (category, searchQuery, currentPage = 1) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allData = Array.from({ length: 112 }, (_, i) => ({
          id: i + 1,
          templeName: `${category} Name ${i + 1}`,
          landline: '+91 78884 57441',
          pocName: 'Sample POC',
          pocNumber: '+91 78884 57441',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500004'
        }));

        let filtered = allData.filter(item =>
          item.templeName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (orderBy && order) {
          filtered = filtered.sort((a, b) =>
            (order === 'asc' ? a[orderBy]?.localeCompare(b[orderBy]) : b[orderBy]?.localeCompare(a[orderBy]))
          );
        }

        const paginated = filtered.slice((currentPage) * perPage, (currentPage + 1) * perPage);
        resolve({
          data: paginated,
          total: filtered.length
        });
      }, 500);
    });
  };

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await mockApiFetch(TABS[activeTab], search, currentPage);
      setAgents(res.data);
      setTotalRecords(res.total);
      setTotalPages(Math.ceil(res.total / perPage));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, search, currentPage, order, orderBy]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const renderRow = useCallback((row, index) => (
    <TableRow key={row.id}>
      <TableCell sx={tableCellStyle}>
        {(currentPage * perPage + index + 1).toString().padStart(3, '0')}
      </TableCell>
      <TableCell sx={tableCellStyle}>{row.templeName}</TableCell>
      <TableCell sx={tableCellStyle}>{row.landline}</TableCell>
      <TableCell sx={tableCellStyle}>{row.pocName}</TableCell>
      <TableCell sx={tableCellStyle}>{row.pocNumber}</TableCell>
      <TableCell sx={tableCellStyle}>
        {(row.city || '') + (row.state ? `, ${row.state}` : '')}
      </TableCell>
      <TableCell sx={tableCellStyle}>{row.pincode}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#ee9714ff",
            color: "#000",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#ee9714ff",
            },
          }}
          onClick={() => {
            console.log("Viewing", row);
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  ), [currentPage, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortHandler = property => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box className="bg-[#fffaf3] min-h-screen p-4 md:p-5 space-y-6">
      {loading && <Loader />}
      <SEO title="Agent Dashboard | Brahmin Connect" />

      {/* Summary Box */}
     <Box
  className="flex justify-between items-center gap-4 border border-[#e6a47e] rounded-2xl p-4 mb-4 bg-white shadow"
  style={{ width: '100%', maxWidth: '600px', marginLeft: 0 }}
>
  {summaryStats.map((item, idx) => (
    <React.Fragment key={idx}>
      <Box className="flex items-center gap-3">
        <img src={item.img} alt={item.label} width={45} height={45} />
        <Box>
          <Typography fontSize={14}>{item.label}</Typography>
          <Typography fontSize={26} fontWeight="bold" color="black">
            {item.count}
          </Typography>
        </Box>
      </Box>

      {/* Vertical Divider (only between items, not after last) */}
      {idx < summaryStats.length - 1 && (
        <Box
          className="hidden sm:block"
          sx={{
            width: '1px',
            height: '50px',
            backgroundColor: '#ece3ddff',
          }}
        />
      )}
    </React.Fragment>
  ))}
</Box>


      <Box className="bg-white border border-orange-200 rounded-xl shadow p-4 space-y-4">
        <Box className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">

          {/* Tabs and search/sort section */}
          <Box className="flex flex-col sm:flex-row flex-wrap gap-4 w-full justify-between">

            {/* TABS in single div */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                width: 'fit-content',
              }}
            >
              {TABS.map((tab, index) => (
                <Button
                  key={tab}
                  size="small"
                  onClick={() => {
                    setActiveTab(index);
                    setCurrentPage(0);
                    setSearch("");
                    setSearchTerm("");
                  }}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    minWidth: '100px',
                    borderRadius: '8px',
                    color: activeTab === index ? '#fff' : '#d75a2c',
                    backgroundColor: activeTab === index ? '#d75a2c' : 'transparent',
                    boxShadow: 'none',
                    border: 'none',
                    '&:hover': {
                      backgroundColor: activeTab === index ? '#c94f21' : 'transparent',
                    },
                  }}
                >
                  {tab}
                </Button>
              ))}
            </Box>



            {/* Search and Sort section */}
            <Box className="flex flex-col sm:flex-row flex-wrap gap-2 items-start sm:items-center">
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search"
                name="src"
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
                  endAdornment: searchTerm?.length > 0 && (
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

              <Box className="flex items-center gap-1">
                <span className="text-sm text-gray-600">Sort by</span>
                <Select
                  size="small"
                  value={orderBy || ''}
                  onChange={e => {
                    setOrderBy(e.target.value);
                    setOrder('asc');
                  }}
                  className="w-[120px]"
                >
                  <MenuItem value="templeName">Newest</MenuItem>
                  <MenuItem value="cityState">Oldest</MenuItem>
                </Select>
              </Box>
            </Box>

          </Box>
        </Box>

        {/* Table */}
        <Box className="overflow-x-auto">
          <CommonTable
            headCells={headCells}
            createSortHandler={sortHandler}
            loading={loading}
            data={agents}
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
        </Box>
      </Box>

    </Box>
  );
};

export default AgentDashboard;
