import { combineReducers } from 'redux';
 
import { DATA_AVAILABLE, ADD_ALARM, REMOVE_ALARM, CHANGE_ALARM, UPDATE_SETTINGS } from "../actions/" //Import the actions types constant we defined in our actions
 
let dataState = { data: [], loading:true };

let settingsState = {
    userName: ''
}
 
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
        case CHANGE_ALARM:
            state = Object.assign({}, state, { data: state.data.map(el => {
                if (el.id === action.id) {
                    return action.changingAlarm
                } else {
                    return el;
                }
            })});
            return state;
        default:
            return state;
    }
};

const settingsReducer = (state = settingsState, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            console.log('reducer', {...action.newSetting}, action.newSetting)
            state = Object.assign({}, state, {...action.newSetting});
            return state;
        default:
            return state;
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer,
    settingsReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;