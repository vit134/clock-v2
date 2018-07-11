export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_ALARM = 'ADD_ALARM';
export const REMOVE_ALARM = 'REMOVE_ALARM';
export const CHANGE_ALARM = 'CHANGE_ALARM';
export const GET_SETTINGS = 'GET_SETTINGS';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';
export const RESET_SETTINGS = 'RESET_SETTINGS';
export const GET_HOME_SETTINGS = 'GET_HOME_SETTINGS';
export const UPDATE_HOME_SETTINGS = 'UPDATE_HOME_SETTINGS';
export const RESET_HOME_SETTINGS = 'RESET_HOME_SETTINGS';

import { AsyncStorage } from 'react-native';

//Import the sample data
import Data from '../alarms';

async function getKey(key) {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.log("Error retrieving data" + error);
    }
};

async function saveKey(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
}
 
export function getData(){
    return (dispatch) => {

        getKey('alarms').then(value => {
            let alarms = JSON.parse(value);

            if (!alarms.length) {
                alarms = [];
            }

            dispatch({type: DATA_AVAILABLE, data: alarms})
        })
    };
}

export function addAlarm(newAlarm){
    return (dispatch) => {
        dispatch({type: ADD_ALARM, newAlarm: newAlarm});
    };
}

export function removeAlarm(id){
    return (dispatch) => {
        dispatch({type: REMOVE_ALARM, id: id});
    };
}

export function changeAlarm(id, changingAlarm){
    return (dispatch) => {
        dispatch({type: CHANGE_ALARM, id, changingAlarm});
    };
}

export function getSettings(newSetting){
    return (dispatch) => {
        getKey('settings').then(value => {
            return dispatch({type: GET_SETTINGS, settings: JSON.parse(value)})
        })
    };
}

export function updateSettings(newSetting){
    return (dispatch) => {
        dispatch({type: UPDATE_SETTINGS, newSetting});
    };
}

export function changeSettings(newSetting, oldSettings){
    return (dispatch) => {
        let newSettings = JSON.stringify(Object.assign({}, oldSettings, newSetting));
        dispatch({type: CHANGE_SETTINGS, newSetting});
    };
}

export function resetSettings(){
    return (dispatch) => {
        dispatch({type: RESET_SETTINGS});
    };
}

export function getHomeSettings(){
    return (dispatch) => {
        
        getKey('settings').then(value => {
            let settings = JSON.parse(value);
            let first = false;

            if (!settings.userName) {
                first = true;
            }

            settings.first = first;
            settings.loading = false;

            dispatch({type: GET_HOME_SETTINGS, homeSettings: {first, loading: false}});
        });
    };
}

