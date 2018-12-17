import { handleActions } from "redux-actions";
import { updateAuth } from "./actions";

const defaultState = {
    authenticated: false,
    token: "",
    error: "",
    user: {
        username: "",
        firstName: "",
        lastName: "",
        userCity: "",
        userStateCode: "",
        numberSaved: 0,
        numberApplied: 0,
        userId: "",
        recentSearches: "",
    }
};

const authReducer = handleActions({
    [updateAuth]: (state, action) => {
        console.log(action)
        return {
            ...state,
            authenticated: true,
            token: action.payload.token,
            user: {
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                userCity: action.payload.userCity,
                userStateCode: action.payload.userStateCode,
                numberSaved: action.payload.numberSaved,
                numberApplied: action.payload.numberApplied,
                recentSearches: action.payload.recentSearches
            }
        }
    }
}, defaultState);

export default authReducer;
