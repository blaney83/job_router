import { handleActions } from "redux-actions";
import { getSaved } from "./actions";

const defaultState = {
    savedResults: [],
    savedLoaded: false,
};

const savedReducer = handleActions({
    [getSaved]: (state, action) => {
        return {
            ...state,
            savedResults: action.payload.savedResults,
        }
    }
}, defaultState);

export default savedReducer;
