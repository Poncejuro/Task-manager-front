import React from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getNestedFieldValue = (obj, field) => {
  return field.split('.').reduce((acc, part) => acc && acc[part], obj); 
};

const CustomTable = ({ columns, data }) => {
  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table aria-label="customized table" sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <StyledTableCell key={index} align={col.align || 'left'}>
                {col.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((col, colIndex) => {
                  const cellData = getNestedFieldValue(row, col.field); 
                  return (
                    <StyledTableCell key={colIndex} align={col.align || 'left'}>
                      {col.render ? col.render(row) : cellData || "N/A"} 
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={columns.length} align="center">
                No tasks found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
