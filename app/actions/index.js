export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_ALARM = 'ADD_ALARM';

//Import the sample data
import Data from '../alarms';
 
export function getData(){
    return (dispatch) => {
 
        //Make API Call
        //For this example, I will be using the sample data in the json file
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            const data = Data;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 500);
 
    };
}

export function addAlarm(newAlarm){
    return (dispatch) => {
        dispatch({type: ADD_ALARM, newAlarm: newAlarm});
    };
}