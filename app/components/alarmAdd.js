import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';
import { Container, Content, Icon } from 'native-base';

import { Scene, Actions } from 'react-native-router-flux';
import { addAlarm, changeAlarm } from '../actions';
import store from '../store';

import { gs } from 'globalStyles';
import NavBar from './NavBar';
import Switch from './Switch';

class AlarmAdd extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.new);
        if (this.props.new) {
            
            let data  = store.getState().dataReducer.data;
            this.state = {
                id: data.length > 1 ? data[data.length - 1].id + 1 : 0,
                time: new Date(),
                title: 'Alarm',
                enabled: true,
                repeatSong: false,
                repeat: [],
                repeatTitle: ''
            };
        } else {
            let alarmData = this.props;
            alarmData.time = new Date(alarmData.time);

            this.state = {
                id: alarmData.id,
                time: alarmData.time,
                title: alarmData.title,
                enabled: alarmData.enabled,
                repeatSong: alarmData.repeatSong,
                repeat: alarmData.repeat,
                repeatTitle: alarmData.repeatTitle
            };
        }
        
        this.setDate = this.setDate.bind(this);
        this.updateRepeat = this.updateRepeat.bind(this);
        this.prepareRepeatTitle = this.prepareRepeatTitle.bind(this);
    }

    updateTitle = (value) => {
        this.setState({
            title: value 
        })
    }

    updateRepeat(value) {
        this.setState({
            repeat: value,
            repeatTitle: this.prepareRepeatTitle()
        })
    }

    setDate(newDate) {
        this.setState({time: newDate})
    }

    onValueChange (value) {
        this.setState({
            selected : value
        });
    }

    prepareRepeatTitle() {
        const arr = this.state.repeat;
        const onlyWeekend = ['Sa', 'Su'];
        const onlyWeekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr'];

        let result = [];

        const isBigEnough = (el) => {
            return arr.indexOf(el) > -1;
        }

        const prepareResult = () => {
            let str = '';
            result.forEach((el, i) => str += i < result.length - 1 ? `${el} ` : el);
            return str;
        }

        if (arr.length < 1) return 'Never';
        if (arr.length === 7) return 'Every day';

        if (arr.length === onlyWeekend.length) {
            if (onlyWeekend.every(isBigEnough)) {
                return 'All weekend';
            } else {
                result = [...arr];
            }
        } else {
            result = [...arr];
        }

        if (arr.length === onlyWeekdays.length) {
            if (onlyWeekdays.every(isBigEnough)) {
                return 'All weekdays';
            } else {
                result = [...arr];
            }
        } else {
            result = [...arr];
        }

        return prepareResult();
        
    }

    saveAlarm() {
        let newAlarm = this.state;
        newAlarm.timeTitle = `${newAlarm.time.getHours()}:${newAlarm.time.getMinutes()}`
        if (this.props.new) {
            store.dispatch(addAlarm(newAlarm));
            this.saveKey(newAlarm)
        } else {
            store.dispatch(changeAlarm(newAlarm.id, newAlarm));
        }
        Actions.pop();
    }
    
    async saveKey(value) {
        console.log('save key');
        try {
            await AsyncStorage.setItem('@MySuperStore:key', value);
            console.log('key was saved');
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    render() {
        return (
            <Container style={gs.container}>
                <NavBar 
                    title={'Alarm add'} 
                    rightAction={this.saveAlarm.bind(this)} 
                    rightTitle={'Save'}
                    leftAction={() => Actions.pop()} 
                    leftTitle={'Cancel'}
                />
                <Content>
                    <DatePickerIOS
                        date={new Date(this.state.time)}
                        onDateChange={this.setDate}
                        mode={'time'}
                        style={styles.datePicker}
                    />
                    <TouchableOpacity style={styles.row} onPress={() => 
                        Actions.alarmRepeatModal({
                            updateRepeat: this.updateRepeat,
                            title: this.state.repeat,
                            checked: this.state.repeat
                        })
                    }>
                        <View><Text style={styles.rowText}>Repeat</Text></View>
                        <View>
                            <View style={styles.rowRightText}>
                                <Text>{this.state.repeat.length > 0 ? this.state.repeatTitle : 'Never'}</Text>
                                <Icon name={'ios-arrow-forward'} style={styles.arrowIcon}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.row}>
                        <View><Text style={styles.rowText}>Title</Text></View>
                        <View>
                            <Text onPress={() => Actions.alarmTitleModal({updateTitle: this.updateTitle, title: this.state.title})}>{this.state.title}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View><Text style={styles.rowText}>Repeat song</Text></View>
                        <View>
                            <Switch/>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    datePicker: {
        paddingBottom: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '100%',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    rowText: {
        color: '#222',
        fontSize: 14
    },
    rowRightText: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    arrowIcon: {
        fontSize: 20,
        color: '#848484',
        marginLeft: 10,
        marginTop: 3
    }
})
  
export default AlarmAdd;