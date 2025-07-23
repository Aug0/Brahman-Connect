import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

function TableSkeleton({headCells}) {
  return (
    [...Array(10)].map((_, index) => (
        <TableRow
          key={index}
          sx={{
            backgroundColor: index % 2 === 0 ? '#F7F6FE' : 'white',
          }}
        >
          {headCells && headCells?.map((headCell, idx) => (
            <TableCell key={idx} align="center">
              <Skeleton sx={{backgroundColor:"#775DA6"}}/>
            </TableCell>
          ))}
          <TableCell align="center">
            <Skeleton />
          </TableCell>
        </TableRow>
      ))
  )
}



export default TableSkeleton

