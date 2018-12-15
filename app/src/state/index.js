import { combineReducers, createStore } from "redux";

import auth from "./auth/reducer"

const reducers = combineReducers({
    auth
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
