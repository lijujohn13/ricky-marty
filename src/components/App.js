import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';
import AppTheme from './AppTheme';
import Characters from './views/Characters';
import 'w3-css/w3.css';
import '../styles/index.scss';

const App = () => (
    <AppTheme>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" className="w3-align-center">Ricky and Marty</Typography>
            </Toolbar>
        </AppBar>
        <Characters />
    </AppTheme>
);

export default App;
