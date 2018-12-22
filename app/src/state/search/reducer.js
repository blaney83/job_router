import { handleActions } from "redux-actions";
import { searchJobs, updateNumberResults, moreResults } from "./actions";

const defaultState = {
    searchCity: "",
    searchState: "",
    searchJob: "",
    searchResults: [],
    numberResults: 15
};

const searchReducer = handleActions({
    [searchJobs]: (state, action) => {
        return {
            ...state,
            searchCity: action.payload.searchCity,
            searchState: action.payload.searchState,
            searchJob: action.payload.searchJob,
            searchResults: action.payload.searchResults,
        }
    },
    [updateNumberResults]: (state, action) => {
        return {
            ...state,
            numberResults: action.payload.numberResults
        }
    },
    [moreResults]: (state, action) => {
        return {
            ...state,
            searchResults: action.payload.searchResults
        }
    }
}, defaultState);

export default searchReducer;
