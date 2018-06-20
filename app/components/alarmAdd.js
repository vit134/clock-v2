import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
    Switch,
    TextInput,
    Button
} from 'react-native';
import { Container, Content } from 'native-base';

import { Scene, Actions } from 'react-native-router-flux';
import * as dataReducer from '../actions';
import store from '../store';

import gs from 'globalStyles';
import NavBar from './NavBar';

class SwitchComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchEnabled: this.props.enabled,
        }
    }
    
    toggleSwitch(value) {
        this.setState({switchEnabled: value})
    }

    render(){
        return (
            <Switch onValueChange={this.toggleSwitch.bind(this)} value = {this.state.switchEnabled}/>
        )
    }
}

class AlarmAdd extends Component {
    constructor(props) {
        super(props);
        let data  = store.getState().dataReducer.data;
        this.state = {
            id: data[data.length - 1].id + 1,
            time: new Date(),
            title: 'Alarm',
            enabled: true
        };
        
        this.setDate = this.setDate.bind(this);
    }

    updateTitle = (value) => {
        this.setState({
            title: value 
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

    saveAlarm() {

        let newAlarm = this.state;

        newAlarm.time = `${newAlarm.time.getHours()}:${newAlarm.time.getMinutes()}`

        store.dispatch({
            type: 'ADD_ALARM',
            newAlarm: newAlarm
        });
        Actions.pop();
    }

    render() {
        return (
            <Container style={gs.container}>
                <NavBar 
                    title={'Alarm'} 
                    rightAction={this.saveAlarm.bind(this)} 
                    rightTitle={'Save'}
                    leftAction={() => Actions.pop()} 
                    leftTitle={'Cancel'}
                    color={gs.topButtons.color}
                />
                <Content>
                    <DatePickerIOS
                        date={this.state.time}
                        onDateChange={this.setDate}
                        mode={'time'}
                        style={styles.datePicker}
                    />
                    <View style={styles.row}>
                        <View><Text style={styles.rowText}>Title</Text></View>
                        <View>
                            <Text onPress={() => Actions.alarmTitleModal({updateTitle: this.updateTitle, title: this.state.title})}>{this.state.title}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View><Text style={styles.rowText}>Repeat song</Text></View>
                        <View>
                            <SwitchComp/>
                        </View>
                    </View>
                    <Button
                        onPress={this.saveAlarm.bind(this)}
                        title="Save Alarm"
                        color="#841584"
                    />
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
    }
})
  
export default AlarmAdd;