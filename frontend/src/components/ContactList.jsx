import React, {useState, useEffect} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { MuiChipsInput } from 'mui-chips-input'


const ContactList = () => {

    const columns = [
        { id: 'name', label: 'Name'},
        {
            id: 'number',
            label: 'Number(s)',
        },
    ];

    const [rows, setRows] = useState([])
    const [isloaded, setLoaded] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [currentContact, setCurrentContact] = useState({})
    const [chips, setChips] = React.useState([])
    const [name, setName] = useState('')

    const handleChipsChange = (chips) => {
        setChips(chips)
    }

    const reformData = (contact) => {
        console.log("reform data: ", contact)
        return {
            id: contact.id,
            name: contact.name,
            number: contact.numbers.join(', ')
        }
    }

    const formatData = (contacts) => {
        const formattedRows = contacts.map((contact) => ({
          id: contact.id,
          name: contact.name,
          number: contact.numbers.join(', ')
        }));
      
        setRows((prevRows) => [...prevRows, ...formattedRows]);
    };
      

    const deleteContact = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${id}`, {
          method: 'DELETE'
        })
        //   .then(res => res.json())
          .then(data => {
            // Filter out the deleted contact from rows
            const updatedRows = rows.filter(row => row.id !== id);
            setRows(updatedRows);
            setDeleteOpen(false)
          })
          .catch(error => {
            // Handle any errors
            console.error('Error deleting contact:', error);
          });
      };

    const addContact = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                numbers: chips
            })
        })
        .then(res => res.json())
        .then(data => {
            setAddOpen(false)
            setChips([])
            setRows((prevRows) => [...prevRows, reformData(data)])
        })
    }
      
    const editContact = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${currentContact.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            numbers: chips
          })
        })
          .then(res => res.json())
          .then(data => {
            setEditOpen(false);
            setChips([]);
            setRows(prevRows => {
              const updatedRows = prevRows.map(row => {
                if (row.id === currentContact.id) {
                  return reformData(data);
                }
                return row;
              });
              return updatedRows;
            });
          })
          .catch(error => {
            // Handle any errors
            console.error('Error editing contact:', error);
          });
      };
      
    useEffect(() => {
        if(!isloaded) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/`)
            .then(res => res.json())
            .then(data => {
                formatData(data)
            })
            setLoaded(true)
        }
    }, [])

    return (
      <Paper sx={{ width: '100%', padding: 8}} elevation={3}>
        <Container sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" sx={{ color: 'white'}} onClick={() => {
                setAddOpen(true)
            }}>
                Add Contact
            </Button>
        </Container>

        <Dialog
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
        >
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this contact?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
                <Button onClick={() => deleteContact(currentContact.id)}>Delete</Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={addOpen}
            onClose={() => setAddOpen(false)}
        >
            <DialogTitle>Add Contact</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{
                    padding: 2,
                }}>
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TextField 
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined" 
                            placeholder='Contact Name' 
                            sx={{
                                marginBottom: 2,
                            }}
                            onChange={(e) => setName(e.target.value)}

    
                        />
                        <MuiChipsInput 
                            value={chips} 
                            onChange={handleChipsChange} 
                            label="Enter your phone number"
                        />
                    </Container>
                   

                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => setAddOpen(false)}>Cancel</Button>
                    <Button onClick={() => addContact()} disabled={
                        name === '' || chips.length === 0
                    }>Add</Button>
                </DialogActions>

            </DialogContent>
        </Dialog>
            
        <Dialog
            open={editOpen}
            onClose={() => setEditOpen(false)}
        >
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{
                    padding: 2,
                }}>
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {
                            console.log("current contact: ", currentContact)
                        }
                        <TextField 
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined" 
                            placeholder='Contact Name' 
                            sx={{
                                marginBottom: 2,
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <MuiChipsInput 
                            value={chips} 
                            onChange={handleChipsChange} 
                            label="Enter your phone number"
                        />
                    </Container>
                   

                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={() => editContact()} disabled={
                        name === '' || chips.length === 0
                    }>Edit</Button>
                </DialogActions>

            </DialogContent>
        </Dialog>

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
                                sx={{ color: 'blue' }}
                                onClick={() => {
                                    setCurrentContact(row)
                                    setName(row.name)
                                    setChips(row.number.split(', '))
                                    setEditOpen(true)
                                }}
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                aria-label="edit"
                                size="small"
                                sx={{ color: 'red' }}
                                onClick={() => {
                                    setCurrentContact(row)
                                    setDeleteOpen(true)
                                }}
                            >
                                <DeleteIcon />
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

    export default ContactList;