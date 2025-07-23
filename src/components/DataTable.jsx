import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography,
  Stack,
  Pagination,
  CircularProgress,
  TableSortLabel
} from "@mui/material";
import DataNotFound from "../components/DataNotFound";
import TableSkeleton from "../components/TableSkelaton";
const CommonTable = ({
  headCells=[],
  data=[],
  renderRow,
  page = 1,
  perPage = 10,
  totalRecords = 0,
  onPageChange,
  loading = false,
  createSortHandler,
  totalPages,
  component =null,
  orderBy,
   order,
  showSorting=true,
  DataNotFoundTxt=""
}) => {
  const from = data.length ? (page - 1) * perPage + 1 : 0;
  const to = (page - 1) * perPage + data.length;

  return (
    <Box>      
      <TableContainer component={component}>
        <Table
          aria-label="simple table"
          sx={{ marginTop: 1 }}
        >
          <TableHead sx={{ "& th": { backgroundColor: "rgba(215,90,44,0.05)" } }}>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sx={{ fontWeight: 'bold' }}
                  // align="center"
                  style={{ minWidth: headCell.minWidth }}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.id !== "action" && showSorting ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          opacity: 1, // Ensure the icon is always visible
                          color: "inherit", // Inherit color from the parent
                        },
                        "&:hover .MuiTableSortLabel-icon": {
                          opacity: 1, // Ensure the icon remains visible on hover
                        },
                      }}
                    >
                      <b>{headCell.label}</b>
                    </TableSortLabel>
                  ) : (
                    <b>{headCell.label}</b>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton headCells={headCells} />
            ) : (
              <>
                {data?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={headCells.length - 1} align="center">
                      <DataNotFound text={ DataNotFoundTxt || 'Data not found'} width="50%"/>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((item, index) => renderRow(item, index))
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body2">
          Showing {from} to {to} of {totalRecords} entries
        </Typography>
        <Pagination
          count={data?.length==0 ? 0 : totalPages+1}
          page={page}
          onChange={(e, value) => onPageChange(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "rgb(215 90 44)",
              backgroundColor: "transparent",
              borderRadius: "0",
              width: "32px",
              height: "32px",
              border: "none",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "rgb(215 90 44)",
              color: "#fff",
              border: "none",
              borderRadius: "0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CommonTable;
