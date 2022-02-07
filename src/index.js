import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouteList from './Router';

import { ContextUserContextProvider } from './Context/userContext'

ReactDOM.render(
    <React.StrictMode>
        <ContextUserContextProvider>
            <RouteList />
        </ContextUserContextProvider>
    </React.StrictMode>,
  document.getElementById('root')
);