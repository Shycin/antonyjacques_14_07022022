/* eslint-disable default-case */
import React, {useState, useContext, useEffect} from 'react'
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

import { userContext } from '../../Context/userContext'
import { states, department } from '../../Data/data'

function FormUser() {

    const { user, setUser } = useContext(userContext)

    const initialValue = {
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        startDate: null,
        street: null,
        city: null,
        state: states[0]['abbreviation'],
        zipCode: null,
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
            each[1] === null
        )

        //setError({ ...error, initialError })
        errors.forEach((error) => {
            switch(error[0])
            {
                case 'firstName': setError({ ...error, firstName: true }); break;
                case 'lastName': setError({ ...error, lastName: true }); break;
                case 'dateOfBirth': setError({ ...error, dateOfBirth: true }); break;
                case 'startDate': setError({ ...error, startDate: true }); break;
                case 'street': setError({ ...error, street: true }); break;
                case 'city': setError({ ...error, city: true }); break;
                case 'state': setError({ ...error, state: true }); break;
                case 'zipCode': setError({ ...error, zipCode: true }); break;
                case 'department': setError({ ...error, department: true }); break;
            }
        })

        


        console.log(errors)
        //const newUser = user.push()
        //setUser(newUser)
    }


    useEffect(()=>{
        console.log(error)
    },[error])

    return (
        <div className="App">
            <Container maxWidth="xs">
                <h1>HRnet</h1>
                {/* <Link to="/"></Link> */}
                <form id='form' action='#' onSubmit={(e) => createNewUser(e)}>
                    <Box mt={2}>
                        <Box mt={2}>
                            <TextField
                                required 
                                id="first-name"
                                // error
                                // id="outlined-error-helper-text"
                                label="First Name"
                                // defaultValue=""
                                // helperText="Incorrect entry."
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
                                    onChange={(newValue) =>
                                        setEmployee({ ...employee, dateOfBirth: newValue })
                                    }
                                    renderInput={(params) => <TextField fullWidth {...params} />}
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
                                    onChange={(newValue) =>
                                        setEmployee({ ...employee, startDate: newValue })
                                    }
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box mt={3}>
                            <fieldset>
                                <legend>Address</legend>
                                <Box mt={1}>
                                    <TextField
                                        required 
                                        id="street" 
                                        label="Street"
                                        fullWidth 
                                        // error={error.street}
                                        // helperText={error.street ? 'Veuillez entre une valeur' : '' }
                                        onChange={(e) =>
                                            setEmployee({ ...employee, street: e.target.value })
                                        }
                                    />
                                </Box>
                                <Box mt={1}>
                                    <TextField
                                        required 
                                        id="city"
                                        label="City"
                                        fullWidth 
                                        // error={error.city}
                                        // helperText={error.city ? 'Veuillez entre une valeur' : '' }
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
                                            // error={error.state}
                                            // helperText={error.state ? 'Veuillez entre une valeur' : '' } 
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
                                        required 
                                        id="zip-code"
                                        label="Zip Code"
                                        fullWidth 
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        error={!Number.isInteger(parseInt(employee.zipCode)) && employee.zipCode !== null}
                                        helperText={!Number.isInteger(parseInt(employee.zipCode)) && employee.zipCode !== null ? 'Veuillez entre un nombre' : '' }
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
                                    // error={error.department}
                                    // helperText={error.department ? 'Veuillez entre une valeur' : '' } 
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