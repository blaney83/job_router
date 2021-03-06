import { handleActions } from "redux-actions";
import { updateAuth, changeSavedUserStats, changeUserSearchInfo, changeAppliedUserStats, updatePostingsViewed, updateCurrentFilters, changeAccountInfo } from "./actions";

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
        savedChartData: [],
        appliedChartData: [],
        postingsViewed: [],
        postingsSaved: [],
        postingsApplied: [],
        recentSearches: [],
        totalSearches: 0,
        siteTag: [],
        filterTag: [],
        sortTag: [],
    }
};

const authReducer = handleActions({
    [updateAuth]: (state, action) => {
        return {
            ...state,
            authenticated: true,
            token: action.payload.token,
            user: {
                username: action.payload.username,
                userId: action.payload.userId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                userCity: action.payload.userCity,
                userStateCode: action.payload.userStateCode,
                numberSaved: action.payload.numberSaved,
                numberApplied: action.payload.numberApplied,
                savedChartData: action.payload.savedChartData,
                appliedChartData: action.payload.appliedChartData,
                postingsViewed: action.payload.postingsViewed,
                postingsSaved: action.payload.postingsSaved,
                postingsApplied: action.payload.postingsApplied,
                recentSearches: action.payload.recentSearches,
                totalSearches: action.payload.totalSearches,
                siteTag: [],
                filterTag: [],
                sortTag: [],
            }
        }
    },
    [changeSavedUserStats]: (state, action) => {
        return {
            ...state,
            user: {
                ...state.user,
                numberSaved: action.payload.numberSaved,
                savedChartData: action.payload.savedChartData,
                postingsSaved: action.payload.postingsSaved,
            }
        }
    },
    [changeUserSearchInfo]: (state, action) => {
        return {
            ...state,
            user: {
                ...state.user,
                recentSearches: action.payload.recentSearches,
                totalSearches: action.payload.totalSearches
            }
        }
    },
    [changeAppliedUserStats]: (state, action) => {
        return {
            ...state,
            user: {
                ...state.user,
                numberApplied: action.payload.numberApplied,
                appliedChartData: action.payload.appliedChartData,
                postingsApplied: action.payload.postingsApplied,
            }
        }
    },
    [updatePostingsViewed]: (state, action) => {
        return {
            ...state,
            user: {
                ...state.user,
                postingsViewed: action.payload.postingsViewed
            }
        }
    },
    [updateCurrentFilters]: (state, action) => {
        return {
            ...state,
            user: {
                ...state.user,
                siteTag: action.payload.siteTag,
                filterTag: action.payload.filterTag,
                sortTag: action.payload.sortTag,
            }
        }
    },
    [changeAccountInfo]: (state, action) => {
        return {
            ...state,
            user: {
                ...state.user,
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                userCity: action.payload.userCity,
                userStateCode: action.payload.userStateCode,
            }
        }
    },
}, defaultState);

export default authReducer;
