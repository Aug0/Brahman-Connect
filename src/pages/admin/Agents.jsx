import React, {useCallback, useMemo, useState, useEffect} from "react";
import {Search as SearchIcon} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {
  Box,
  TableCell,
  Select,
  TableRow,
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import {useError} from "../../context/ErrorContext";
// Icons
import ClearIcon from "@mui/icons-material/Clear";
import {FaRegEdit} from "react-icons/fa";
import CommonTable from "../../components/DataTable";
import useDebounce from "../../hooks/useDebounce";
import query from "../../queries/adminQuery";
import SEO from "../../components/SEO";
import Loader from "../../components/Loader";

const tableCellStyle = {
  fontSize: "15.29px",
  fontWeight: 500,
  lineHeight: "20.16px",
  color: "#292D32",
};

function Agents() {
  const {handleError} = useError();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const headCells = useMemo(
    () => [
      {id: "firstName", label: "First Name", minWidth: 120},
       {id: "lastName", label: "Last Name", minWidth: 120},
      {id: "email", label: "Email", minWidth: 130},
      {id: "mobile", label: "Mobile Number", minWidth: 130},
      {id: "alternateContactNumber", label: "Alternate Number", minWidth: 130},
      {id: "action", label: "Action", sort: false},
    ],
    []
  );

  const renderRow = useCallback(
    (row, index) => (
      <TableRow key={index}>
        <TableCell sx={tableCellStyle}>{row?.firstName}</TableCell>
        <TableCell sx={tableCellStyle}>{row?.lastName}</TableCell>
        <TableCell sx={tableCellStyle}>{row?.email}</TableCell>
        <TableCell sx={tableCellStyle}>{row?.mobile}</TableCell>
        <TableCell sx={tableCellStyle}>{row?.alternateContactNumber}</TableCell>
        <TableCell>
          <Button onClick={() => navigate(`/admin/agent/edit/${row.id}`)}>
            <FaRegEdit style={{color: "#775DA6", fontSize: 15}} />
          </Button>
        </TableCell>
      </TableRow>
    ),
    []
  );

  const sortHandler = useCallback(
    property => () => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [orderBy, order]
  );

  const handlePageChange = useCallback(page => {
    setCurrentPage(page);
  }, []);
  const debouncedSearch = useDebounce(value => {
    if (value) {
      setSearch(value);
    }
  }, 1000);

  const handleChange = useCallback(
    event => {
      const {value} = event.target;
      if (value.length > 0) {
        debouncedSearch(value);
        setSearchTerm(value);
      } else {
        debouncedSearch("");
        setSearchTerm("");
      }
    },
    [debouncedSearch]
  );

  const fetchAgents = useCallback(async () => {
    setLoading(true);

    const requestParams = {
      page: currentPage,
      size: perPage,
    };

    // Add sort if it's not blank
    if (orderBy && order) {
      requestParams.sort = [{column: orderBy, order: order}];
    }

    // Add search if it's not blank
    if (search) {
      requestParams.page = 0;
      requestParams.search = [{column: "ALL", searchString: search}];
    }

    try {
      const response = await query.getAgents(requestParams);
      if (response) {
        setLoading(false);
        if (response?.code === 200 || response.code === 201) {
          setAgents(response.data);
          setTotalPages(response.pageCount);
          setTotalRecords(response.count);
        } else if (response.code !== undefined) {
          handleError("Error", response.message, true);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError("Error", error.message, true);
    }
  }, [currentPage, perPage, orderBy, order, search]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents, currentPage, perPage, orderBy, order, search]);

 
  return (
    <Box className="bg-[#fffaf3] min-h-screen p-4 md:p-5 space-y-6">
      {
         loading && <Loader/>
      }
      
      <SEO title='Agents | Brahmin Connect'/>
      <Box className="bg-white border border-orange-200 rounded-xl shadow p-4 space-y-4">
        {/* Header */}
        <Box className="flex flex-col md:flex-row justify-between gap-3">
          <Typography
            variant="h5"
            className="text-2xl font-semibold mb-1 text-gray-800"
          >
            Agents
          </Typography>
          <Box className="flex flex-col sm:flex-row gap-2 items-center">
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search"
              name="src"
              value={searchTerm}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{color: "#7E7E7E"}} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm?.length > 0 && (
                  <InputAdornment position="end">
                    <ClearIcon
                      sx={{color: "#7E7E7E", cursor: "pointer"}}
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

            {/* <Box className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Sort by</span>
              <Select
                size="small"
                // value={sort}
                // onChange={e => setSort(e.target.value)}
                className="w-[120px]"
              >
                <MenuItem value="Newest">Newest</MenuItem>
                <MenuItem value="Oldest">Oldest</MenuItem>
              </Select>
            </Box> */}
          </Box>
        </Box>
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
          DataNotFoundTxt={"Agents Not Found"}
          totalRecords={totalRecords}
          
        />
      </Box>
    </Box>
  );
}

export default Agents;
