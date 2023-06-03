import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const columns = [
    { id: 'name', label: 'Name'},
    {
      id: 'number',
      label: 'Number(s)',
    },
  ];
  
  function createData(name, number) {
    return { name, number };
  }
  
  const rows = [
    createData('India', 3287263),
    createData('India', 3287263),
  ];
  
  export default function ContactList() {

    return (
      <Paper sx={{ width: '100%', padding: 8}} elevation={3}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.map((row) => (
                    <TableRow
                        key={row.name}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            {row.number}
                        </TableCell>

                        <TableCell align='right'>
                            <IconButton
                                aria-label="delete"
                                size="small"
                                sx={{ color: 'red' }}
                            >
                                <DeleteIcon />
                            </IconButton>

                            <IconButton
                                aria-label="edit"
                                size="small"
                                sx={{ color: 'blue' }}
                            >
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }