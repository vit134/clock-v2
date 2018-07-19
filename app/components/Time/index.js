import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import moment from 'moment';

import { Container, Content, Icon } from 'native-base';
import NavBar from '../NavBar';

export default class Time extends Component {
    constructor() {
        super();

        this.state = {
            time: moment()
        }

        this.updatetime = this.updatetime.bind(this)
        this.updatetime();
    }

    updatetime() {
        setInterval(() => this.setState({time: moment()}), 1000);
    }

    render() {
        return (
            <Container>
                <NavBar title={'Time'}/>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.state.time.format('HH')}</Text>
                    <Text style={styles.text}>:</Text>
                    <Text style={styles.text}>{this.state.time.format('mm')}</Text>
                    <Text style={styles.text}>:</Text>
                    <Text style={styles.text}>{this.state.time.format('ss')}</Text>
                </View>
            </Container>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    text: {
        fontSize: 90,
        color: 'red',
        fontFamily: 'digital',
    }
})