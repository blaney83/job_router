import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import auth from "./auth/reducer"
import search from "./search/reducer"
import saved from "./saved/reducer"

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const reducers = combineReducers({
    auth,
    search,
    saved
});

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    pReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

