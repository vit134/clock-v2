import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    DatePickerIOS
} from 'react-native';
import { Container, Content, Icon, Button } from 'native-base';

import { gs, colorRed } from 'globalStyles';
import NavBar from '../NavBar';

import store from '../../store';
import { changeSettings } from '../../actions';

export default class SettingsTime extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...store.getState().settingsReducer,
            time: new Date(),
            changed: false
        }
    }

    submit() {
        //store.dispatch(changeSettings({userName: this.state.userName}, store.getState().settingsReducer));
    }

    sync() {
        this.setState({time: new Date(), changed: false})
    }

    setDate(newTime) {
        this.setState({time: newTime, changed: true})
    }

    render() {
        return(
            <Container>
                <View style={[gs.container, {alignItems: 'center', justifyContent: 'center'}]}>
                    <View style={{width: '100%'}}>
                        <View style={styles.iconBar}>
                            { this.state.changed ? <Icon name="sync" style={styles.icons} onPress={this.sync.bind(this)}/> : ''}
                        </View>
                        <View>
                            <DatePickerIOS
                                date={new Date(this.state.time)}
                                onDateChange={this.setDate.bind(this)}
                                mode={'datetime'}
                                style={styles.datePicker}
                            />
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    iconBar: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
        minHeight: 44
    },
    icons: {
        fontSize: 40, 
        color: colorRed
    }
});