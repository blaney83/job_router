import { combineReducers, createStore } from "redux";

import auth from "./auth/reducer"
import search from "./search/reducer"

const reducers = combineReducers({
    auth,
    search
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
