import { combineReducers } from 'redux';

import { AsyncStorage } from 'react-native';
 
import { DATA_AVAILABLE, ADD_ALARM, REMOVE_ALARM, CHANGE_ALARM, UPDATE_SETTINGS, RESET_SETTINGS } from "../actions/" //Import the actions types constant we defined in our actions
 
let dataState = { data: [], loading:true };

let settingsState = {};

async function saveKey(value) {
  try {
      await AsyncStorage.setItem('settings', JSON.stringify(value));
  } catch (error) {
      console.log("Error saving data" + error);
  }
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
            state = Object.assign({}, state, {...action.newSetting});
            return state;
        case RESET_SETTINGS:
            state = {};
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