import React from 'react';
import {
    createMuiTheme,
    MuiThemeProvider,
} from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../utils/constants';

const AppTheme = ({
    children
}) => {
    const themeObj = {
        typography: {
            useNextVariants: true,
            fontFamily: [
                '"Lato"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif'
            ].join(','),
        },
        palette: {
            primary: {
                main: PRIMARY_COLOR,
                contrastText: '#ffffff'
            },
            secondary: {
                main: SECONDARY_COLOR,
                contrastText: '#4a4a4a'
            },
        },
        overrides: {
            MuiInput: {
                underline: {
                    '&:before': { // underline color when textfield is inactive
                        borderBottom: '1px solid #dadada',
                    },
                    '&:hover:not($disabled):not($error):not($focused):before': {
                        borderBottom: `2px solid ${PRIMARY_COLOR}`, // underline color when textfield hovered
                    },
                },
            },
        }
    };

    const appTheme = createMuiTheme(themeObj);
    return (
        <MuiThemeProvider theme={appTheme}>
            <StylesProvider injectFirst>
                <ThemeProvider theme={appTheme}>
                    {children}
                </ThemeProvider>
            </StylesProvider>
        </MuiThemeProvider>
    );
};

export default AppTheme;
