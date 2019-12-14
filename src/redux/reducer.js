import { combineReducers } from 'redux';
import { SET_CHARACTERS } from './actionTypes';

const characters = (state = {}, action) => {
    const {
        type,
        value
    } = action;
    if (type === SET_CHARACTERS) {
        return Object.assign({}, state, {
            ...value
        });
    }

    return state;
};

export default combineReducers({
    characters
});
