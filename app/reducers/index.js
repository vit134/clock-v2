import { combineReducers } from 'redux';

import { AsyncStorage } from 'react-native';
 
import { 
    DATA_AVAILABLE,
    ADD_ALARM, 
    REMOVE_ALARM, 
    CHANGE_ALARM, 
    GET_SETTINGS, 
    UPDATE_SETTINGS, 
    CHANGE_SETTINGS, 
    RESET_SETTINGS,
    GET_HOME_SETTINGS,
    CHANGE_HOME_SETTINGS
} from "../actions/";
 
let dataState = { data: [], loading:true };

let settingsState = {timeFormat: '24h'};
let homeState = {loading: true, first: true};

async function saveKey(key, value) {
  try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
      console.log("Error saving data" + error);
  }
}
 
const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading: false });
            return state;
        case ADD_ALARM:
            state = Object.assign({}, state, { data: state.data.concat(action.newAlarm) });

            saveKey('alarms', state.data).then(() => state)
            return state;
        case REMOVE_ALARM:
            state = Object.assign({}, state, { data: state.data.filter(el => el.id !== action.id) });

            saveKey('alarms', state.data).then(() => state);
            
            return state;
        case CHANGE_ALARM:
            state = Object.assign({}, state, { data: state.data.map(el => {
                if (el.id === action.id) {
                    return action.changingAlarm
                } else {
                    return el;
                }
            })});

            saveKey('alarms', state.data).then(() => state)

            return state;
        default:
            return state;
    }
};

const settingsReducer = (state = settingsState, action) => {
    switch (action.type) {
        case GET_SETTINGS:
            let first = true;
            if (Object.keys(action.settings).length > 0) first = false;
            state = Object.assign({}, state, {...action.settings, loading: false, first});
            return state;
        case UPDATE_SETTINGS:
            state = Object.assign({}, state, {...action.newSetting});
            return state;
        case CHANGE_SETTINGS:
            state = Object.assign({}, state, {...action.newSetting});
            saveKey('settings', state);
            return state;
        case RESET_SETTINGS:
            state = {};
            saveKey('settings', JSON.stringify(state)).then(() => state)
            return state;
        default:
            return state;
    }
};

const homeSettingsReducer = (state = homeState, action) => {
    switch (action.type) {
        case GET_HOME_SETTINGS:
            state = Object.assign({}, state, {...action.homeSettings, loading: false});
            return state;
        case CHANGE_HOME_SETTINGS:
            state = Object.assign({}, state, {...action.newSetting});
            return state;
        default:
            return state;
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer,
    settingsReducer,
    homeSettingsReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;