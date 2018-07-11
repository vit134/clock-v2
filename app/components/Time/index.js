import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import moment from 'moment';

import { Container, Content, Icon } from 'native-base';

export default class Time extends Component {
    constructor() {
        super();

        this.state = {
            time: moment().format('HH:mm:ss')
        }

        this.updatetime = this.updatetime.bind(this)
        this.updatetime();
    }

    updatetime() {
        setInterval(() => this.setState({time: moment().format('HH:mm:ss')}), 1000);
    }

    render() {
        return (
            <Container>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                    <Text style={{fontSize: 130, color: 'red', fontFamily: 'digital' }}>{this.state.time}</Text>
                </View>
            </Container>
        )
    }
}