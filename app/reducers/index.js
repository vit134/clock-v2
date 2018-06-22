import { combineReducers } from 'redux';
 
import { DATA_AVAILABLE, ADD_ALARM, REMOVE_ALARM } from "../actions/" //Import the actions types constant we defined in our actions
 
let dataState = { data: [], loading:true };
 
const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        case ADD_ALARM:
            state = Object.assign({}, state, { data: state.data.concat(action.newAlarm) });
            return state;
        case REMOVE_ALARM:
            state = Object.assign({}, state, { data: state.data.filter(el => el.id !== action.id) });
            return state;
        default:
            return state;
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;