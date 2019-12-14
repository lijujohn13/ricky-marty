import React from 'react';
import { get } from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import CheckBox from '../../common/CheckBox';

const FilterBox = ({
    name,
    label,
    filters,
    onChange,
    selectedFilters
}) => {
    const filterName = name.split('.')[1];
    return (
        <Grid item xs={12} md={12} className="r8y-filter-container w3-margin-top w3-margin-bottom">
            <Grid container className="w3-padding">
                <Typography variant="h5">
                    {label}
                </Typography>
                {filters.map(eachFilter => (
                    <Grid key={eachFilter} item xs={12}>
                        <CheckBox
                            id={`${filterName}-${eachFilter}`}
                            name={name}
                            label={eachFilter}
                            value={eachFilter}
                            checked={Boolean(get(selectedFilters, `[${filterName}]`) && selectedFilters[filterName] === eachFilter)}
                            onChange={onChange}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default FilterBox;
