import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FormUser from './View/FormUser';
 
export default class RouteList extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/"><FormUser /></Route>
                </Switch>
            </Router>
        )
    }
}