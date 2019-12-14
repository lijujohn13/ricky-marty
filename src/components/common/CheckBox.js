import React from 'react';
import {
    Checkbox,
    Typography
} from '@material-ui/core';

export const CheckBoxLabel = ({
    value,
    label,
    name,
    id,
    disabled,
    onChange,
    classes,
    checked
}) => (
    <>
        <Checkbox
            id={id}
            name={name}
            checked={checked}
            color="primary"
            onChange={onChange}
            value={value}
            disabled={disabled}
            classes={classes}
        />
        <Typography variant="body">
            {label}
        </Typography>
    </>
);

export default CheckBoxLabel;
