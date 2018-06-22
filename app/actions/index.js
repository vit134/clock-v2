export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_ALARM = 'ADD_ALARM';
export const REMOVE_ALARM = 'REMOVE_ALARM';
export const CHANGE_ALARM = 'CHANGE_ALARM';

//Import the sample data
import Data from '../alarms';

async function getKey() {
    try {
        return await AsyncStorage.getItem('@alarms');
    } catch (error) {
        console.log("Error retrieving data" + error);
    }
};
 
export function getData(){
    return (dispatch) => {
        /* setTimeout(() => {
            const data = Data;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 100); */

        getKey().then(value => dispatch({type: DATA_AVAILABLE, data: value}))
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