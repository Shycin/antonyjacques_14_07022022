import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FormUser from './View/FormUser';
import DataTableUsers from './View/DataTable';
 
export default function RouteList() {

    return (
        <Router>
            <Switch>
                <Route exact path="/"><FormUser /></Route>
                <Route exact path="/employee-list"><DataTableUsers /></Route>
            </Switch>
        </Router>
    )

}