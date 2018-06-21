export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_ALARM = 'ADD_ALARM';

//Import the sample data
import Data from '../alarms';
 
export function getData(){
    return (dispatch) => {
        setTimeout(() => {
            const data = Data;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 100);
 
    };
}

export function addAlarm(newAlarm){
    return (dispatch) => {
        dispatch({type: ADD_ALARM, newAlarm: newAlarm});
    };
}