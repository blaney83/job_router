/* eslint-disable */

//NOT REAL CODE
const {createStore, combineReducers} = require("redux");

function whatever(state = [], action){
    switch(action.type){
        case 'ACTION':
            return [...state, {
                text: action.payload
            }]
        default:
            return state;
    }
}

const reducer = combineReducers({todos});

export default reducer;
//when importing reducer, then run vvvvvvvv
const store = createStore(reducer);

