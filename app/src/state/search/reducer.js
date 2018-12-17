import { handleActions } from "redux-actions";
import { searchJobs, updateNumberResults } from "./actions";

const defaultState = {
    searchCity: "",
    searchState: "",
    searchJob: "",
    searchResults: [],
    numberResults: 15
};

const searchReducer = handleActions({
    [searchJobs]: (state, action) => {
        console.log(action)
        return {
            ...state,
            searchCity: action.payload.searchCity,
            searchState: action.payload.searchState,
            searchJob: action.payload.searchJob,
            searchResults: action.payload.searchResults,
            // numberResults: action.payload.numberResults
        }
    },
    [updateNumberResults]: (state, action) => {
        console.log(action)
        return {
            ...state,
            numberResults: action.payload.numberResults
        }
    }
}, defaultState);

export default searchReducer;
