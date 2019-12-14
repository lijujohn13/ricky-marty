import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { get, cloneDeep } from 'lodash';
import {
    Grid,
    Typography,
    Chip,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
    InputLabel
} from '@material-ui/core';
import {
    Search,
    ClearOutlined
} from '@material-ui/icons';
import getCharacters from '../../../redux/actions';
import Card from './Card';
import FilterBox from './Filter';
import Loader from '../../common/Loader';
import Pagination from '../../common/Pagination';

const Characters = ({
    characterList,
    fetchCharacterList,
}) => {
    let content = null;
    let characters = [];
    const [searchVal, setSearchVal] = useState('');
    const [sort, setSort] = useState('asc');
    const [selectedFilters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    // handles api call to get character list
    const getCharacterList = (pageChanged = false) => {
        let reqData = '';
        if (Object.values(selectedFilters).length) {
            Object.keys(selectedFilters).forEach((eachKey, index) => {
                if (index !== 0) {
                    reqData += '&';
                }
                reqData += `${eachKey}=${selectedFilters[eachKey]}`;
            });
        }

        if (pageChanged) {
            reqData += `&page=${currentPage}`;
        }

        reqData += `&name=${decodeURIComponent(searchVal)}`;
        fetchCharacterList(`?${reqData}`);
    };

    // handles filter, search and sort changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchVal') {
            setSort('asc');
            return setSearchVal(value);
        }

        if (name === 'sort') {
            return setSort(value);
        }

        if (name.indexOf('filter') > -1) {
            const { checked } = e.target;
            const filterName = name.split('.')[1];
            const newSelectedFilters = cloneDeep(selectedFilters);
            if (!newSelectedFilters[filterName]) {
                newSelectedFilters[filterName] = '';
            }
            if (checked) {
                newSelectedFilters[filterName] = value;
            } else {
                newSelectedFilters[filterName] = '';
            }

            setCurrentPage(1);
            setSort('asc');
            return setFilters(newSelectedFilters);
        }
    };

    // handles removal of selected filter
    const handleFilterRemove = (filter) => {
        const newFilter = cloneDeep(selectedFilters);
        if (!selectedFilters[filter]) {
            return;
        }

        newFilter[filter] = '';
        setSort('asc');
        setFilters(newFilter);
    };

    // clears search field value
    const handleClearSearch = () => {
        setSearchVal('');
    };

    // handles page cahnge
    const handlePagination = (page) => {
        setSort('asc');
        setCurrentPage(page);
    };

    // fetch characters on component mount
    useEffect(() => {
        getCharacterList();
    }, []);

    // fetch characters on filters and search value changes
    useEffect(() => {
        getCharacterList();
    }, [searchVal, selectedFilters]);

    // fetch new page of characters when page no changes
    useEffect(() => {
        getCharacterList(true);
    }, [currentPage]);

    if (!characterList || get(characterList, 'inProgress')) {
        content = <Loader />;
    } else if (get(characterList, 'error') || !get(characterList, 'data.results.length')) {
        content = (
            <Grid container className="w3-padding w3-center" justify="center">
                <Typography variant="h5">No Characters Found</Typography>
            </Grid>
        );
    } else {
        characters = get(characterList, 'data.results.length') > 0 ? characterList.data.results : [];
        if (sort) {
            const sortFunc = sort === 'asc' ? (a, b) => a.id - b.id : (a, b) => b.id - a.id;
            characters = characters.sort(sortFunc);
        }
        content = (
            <Grid container spacing={2} className="w3-padding" style={{ backgroundColor: 'rgb(32, 35, 41)' }}>
                {characters.map(eachCharacter => (
                    <Grid key={eachCharacter.id} item xs={6} md={3} sm={6}>
                        <Card data={eachCharacter} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    const speciesFilter = ['Human', 'Mytholog', 'Humanoid', 'Alien', 'unknown', 'Robot', 'Vampire', 'Disease'];
    const genderFilter = ['Male', 'Female', 'Genderless', 'unknown'];
    const filters = [
        {
            label: 'Species',
            value: speciesFilter
        },
        {
            label: 'Gender',
            value: genderFilter
        },
    ];
    const commonFilterProps = {
        onChange: handleChange,
        selectedFilters
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={2} className="w3-padding-large w3-white r8y-filter-sidebar">
                <Grid container>
                    <Typography variant="h5" className="w3-margin-bottom">
                        Filter
                    </Typography>
                    {filters.map(eachFilter => (
                        <FilterBox
                            label={eachFilter.label}
                            filters={eachFilter.value}
                            name={`filter.${eachFilter.label.toLowerCase()}`}
                            {...commonFilterProps}
                        />
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={10} className="w3-padding-large">
                <Grid container>
                    <Typography variant="h5" className="w3-margin-bottom">
                       Selected Filters
                    </Typography>
                    <Grid item xs={12} md={12} className="w3-margin-bottom">
                        {
                            Object.keys(selectedFilters).filter(
                                eachFilter => selectedFilters[eachFilter]
                            ).map(selectedFilter => (
                                <Chip
                                    color="primary"
                                    key={selectedFilters[selectedFilter]}
                                    label={selectedFilters[selectedFilter]}
                                    onDelete={() => handleFilterRemove(selectedFilter)}
                                    className="w3-margin-right w3-margin-bottom"
                                />
                            ))
                        }
                    </Grid>
                    <Grid item xs={12} md={12} className="w3-margin-bottom">
                        <Grid container justify="space-between" spacing={4}>
                            <Grid item xs={6}>
                                <InputLabel htmlFor="searchVal">
                                    <Typography variant="body1">Search By Name</Typography>
                                </InputLabel>
                                <TextField
                                    id="searchs"
                                    type="text"
                                    placeholder="Search character"
                                    name="searchVal"
                                    fullWidth
                                    value={searchVal}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search className="w3-text-grey" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <ClearOutlined
                                                    disabled={!searchVal}
                                                    className={`w3-text-grey ${searchVal ? 'r8y-cursor' : 'r8y-non-clickable'}`}
                                                    onClick={handleClearSearch}
                                                />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel htmlFor="sort">
                                    <Typography variant="body1">Sort</Typography>
                                </InputLabel>
                                <Select
                                    name="sort"
                                    value={sort}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="asc">Ascending</MenuItem>
                                    <MenuItem value="desc">Descending</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className="w3-margin-top">
                        {content}
                        {get(characters, 'length') > 0 && (
                            <Pagination
                                count={get(characterList, 'data.info.count')}
                                currentPage={currentPage}
                                onChange={handlePagination}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    characterList: get(state, 'characters', {})
});

const mapDispatchToProps = {
    fetchCharacterList: getCharacters
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Characters);
