import { get } from 'lodash';
import { PRIMARY_COLOR } from './constants';

export const getPrimaryColor = (props) => {
    let priColor = PRIMARY_COLOR;

    if (get(props, 'theme.palette.primary')) {
        priColor = props.theme.palette.primary.main;
    }

    return priColor;
};

export default getPrimaryColor;
