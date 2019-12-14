import makeRequest from '../utils/makeRequest';
import { SET_CHARACTERS } from './actionTypes';

const setData = (inProgress = true, type, data = {}, error = null) => ({
    type,
    value: {
        inProgress,
        data,
        error
    },
});

const getCharacters = reqData => async (dispatch) => {
    dispatch(setData(true, SET_CHARACTERS));
    try {
        const resp = await makeRequest({
            url: `https://rickandmortyapi.com/api/character${reqData}`
        });
        if (resp.status === 200) {
            dispatch(setData(false, SET_CHARACTERS, resp.data));
        } else {
            dispatch(setData(false, SET_CHARACTERS, resp));
        }
    } catch (ex) {
        dispatch(setData(false, SET_CHARACTERS, null, ex.message));
    }
};

export default getCharacters;
