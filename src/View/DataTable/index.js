import React, { useEffect, useContext } from 'react'
import DataTable from 'shycin-table-react'
import { Link } from 'react-router-dom';
import {column} from '../../data'

import { usersContext } from '../../Context/userContext'

import Container from '@mui/material/Container';

function App() {

    const { users } = useContext(usersContext)

    useEffect(() => {
        console.log(users)
    },[users])

    return (
        <div className="App">
            <Container maxWidth="lg">
                <DataTable columns={column} data={users}/>
                <Link to='/'>Home</Link>
            </Container>
        </div>
    );
}

export default App;
