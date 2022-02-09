/* eslint-disable default-case */
import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { usersContext } from '../../Context/userContext'
import { states, department } from '../../Data/data'

import { Save } from '../../Services/Save'

function FormUser() {

    const { users, setUsers } = useContext(usersContext)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const initialValue = {
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        startDate: null,
        street: '',
        city: '',
        state: states[0]['abbreviation'],
        zipCode: '',
        department: department[0],
    }
    const [employee, setEmployee] = useState(initialValue)


    const initialError = {
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        startDate: false,
        street: false,
        city: false,
        state: false,
        zipCode: false,
        department: false,
    }
    const [error, setError] = useState(initialError)


    const createNewUser = (event) => {

        event.preventDefault();

        const errors = Object.entries(employee).filter((each) => 
            each[1] === null || each[1] === ''
        )

        if(errors.length)
        {
            setError({ ...error, initialError })

            var init = {
                firstName: false,
                lastName: false,
                dateOfBirth: false,
                startDate: false,
                street: false,
                city: false,
                state: false,
                zipCode: false,
                department: false,
            }
            errors.forEach((error_) => {
                switch(error_[0])
                {
                    case 'firstName': init = { ...init, firstName: true }; break;
                    case 'lastName': init = { ...init, lastName: true }; break;
                    case 'dateOfBirth': init = { ...init, dateOfBirth: true }; break;
                    case 'startDate': init = { ...init, startDate: true }; break;
                    case 'street': init = { ...init, street: true }; break;
                    case 'city': init = { ...init, city: true }; break;
                    case 'state': init = { ...init, state: true }; break;
                    case 'zipCode': init = { ...init, zipCode: true }; break;
                    case 'department': init = { ...init, department: true }; break;
                }
            })

            setError({ ...error, ...init })
        }
        else
        {
            setError({ ...error, initialError })
            Save(employee).then((data) => {
                setUsers([...users, employee] )
                setEmployee(initialValue)
                handleOpen()
            })
        }
        
    }

    useEffect(() => {
        console.log(users)
    },[users])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="App">
            <Container maxWidth="xs">
                <h1>HRnet</h1>
                <Link to="/employee-list">View Current Employees</Link>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Employee Created !
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                            >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Modal>
                <form id='form' action='#' onSubmit={(e) => createNewUser(e)}>
                    <Box mt={2}>
                        <Box mt={2}>
                            <TextField
                                value={employee.firstName}
                                required 
                                id="first-name"
                                label="First Name"
                                fullWidth 
                                error={error.firstName}
                                helperText={error.firstName ? 'Veuillez entre une valeur' : '' }
                                onChange={(e) =>
                                    setEmployee({ ...employee, firstName: e.target.value })
                                }
                            />
                        </Box>
                        <Box mt={2}>
                            <TextField
                                value={employee.lastName}
                                required 
                                id="last-name"
                                label="Last Name"
                                fullWidth 
                                error={error.lastName}
                                helperText={error.lastName ? 'Veuillez entre une valeur' : '' }
                                onChange={(e) =>
                                    setEmployee({ ...employee, lastName: e.target.value })
                                }
                            />
                        </Box>
                        <Box mt={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    required
                                    id="date-birth"
                                    label="Date of Birth"
                                    value={employee.dateOfBirth}
                                    onChange={(newValue) => {
                                        if(newValue.toString() !== 'Invalid Date')
                                            setEmployee({ ...employee, dateOfBirth: newValue })
                                    }}
                                    renderInput={(params) => <TextField 
                                        fullWidth {...params} 
                                        value={employee.dateOfBirth}
                                        error={error.dateOfBirth}
                                        helperText={error.dateOfBirth ? 'Veuillez entre une date' : '' }
                                    />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box mt={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    required 
                                    id="start-date"
                                    label="Start Date"
                                    value={employee.startDate}
                                    onChange={(newValue) => {
                                        if(newValue.toString() !== 'Invalid Date')
                                            setEmployee({ ...employee, startDate: newValue })
                                    }}
                                    renderInput={(params) => <TextField 
                                        fullWidth {...params} 
                                        value={null}
                                        error={error.startDate}
                                        helperText={error.startDate ? 'Veuillez entre une date' : '' }
                                    />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box mt={3}>
                            <fieldset>
                                <legend>Address</legend>
                                <Box mt={1}>
                                    <TextField
                                        value={employee.street}
                                        required 
                                        id="street" 
                                        label="Street"
                                        fullWidth 
                                        error={error.street}
                                        helperText={error.street ? 'Veuillez entre une valeur' : '' }
                                        onChange={(e) =>
                                            setEmployee({ ...employee, street: e.target.value })
                                        }
                                    />
                                </Box>
                                <Box mt={1}>
                                    <TextField
                                        value={employee.city}
                                        required 
                                        id="city"
                                        label="City"
                                        fullWidth 
                                        error={error.city}
                                        helperText={error.city ? 'Veuillez entre une valeur' : '' }
                                        onChange={(e) =>
                                            setEmployee({ ...employee, city: e.target.value })
                                        }
                                    />
                                </Box>
                                <Box mt={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label-state">State</InputLabel>
                                        <Select
                                            required 
                                            id="state"
                                            labelId="select-label-state"
                                            label="State"
                                            value={employee.state}
                                            onChange={(e) =>
                                                setEmployee({ ...employee, state: e.target.value })
                                            }
                                        >
                                            {
                                                states.map((item, key) => {
                                                    return <MenuItem key={key} value={item.abbreviation}>{item.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box mt={1}>
                                    <TextField
                                        value={employee.zipCode}
                                        required 
                                        id="zip-code"
                                        label="Zip Code"
                                        fullWidth 
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        error={!Number.isInteger(parseInt(employee.zipCode)) && employee.zipCode !== null && employee.zipCode !== ''}
                                        helperText={!Number.isInteger(parseInt(employee.zipCode)) && employee.zipCode !== null && employee.zipCode !== '' ? 'Veuillez entre un nombre' : '' }
                                        onChange={(e) => {
                                            setEmployee({ ...employee, zipCode: parseInt(e.target.value) })
                                        }}
                                    />
                                </Box>
                            </fieldset>
                        </Box>
                        <Box mt={3}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label-department">Department</InputLabel>
                                <Select
                                    required 
                                    id="first-department"
                                    labelId="select-label-department" 
                                    label="Department"
                                    value={employee.department}
                                    onChange={(e) =>
                                        setEmployee({ ...employee, department: e.target.value })
                                    }
                                >
                                    {
                                        department.map((item, key) => {
                                            return <MenuItem key={key} value={item}>{item}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={3}>
                            <Button fullWidth variant="outlined" type="submit">Save</Button>
                        </Box>
                    </Box>
                </form>
            </Container>
        </div>
    );
}

export default FormUser;