import { handleActions } from "redux-actions";
import { getSaved } from "./actions";

const defaultState = {
    // searchCity: "",
    // searchState: "",
    // searchJob: "",
    savedResults: [],
    savedLoaded: false,
};

const savedReducer = handleActions({
    [getSaved]: (state, action) => {
        console.log(action)
        return {
            ...state,
            // searchCity: action.payload.searchCity,
            // searchState: action.payload.searchState,
            // searchJob: action.payload.searchJob,
            savedResults: action.payload.savedResults,
        }
    }
}, defaultState);

export default savedReducer;
