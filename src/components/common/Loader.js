import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const Loader = ({
    style
}) => (
    <div className="w3-center w3-padding">
        <CircularProgress style={style} />
    </div>
);

export default withTheme(Loader);
