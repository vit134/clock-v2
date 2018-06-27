import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Icon } from 'native-base';

import store from '../../store';
import { updateSettings } from '../../actions';

import * as S from 'globalStyles';

export default class LoginStep1 extends Component {
    constructor() {
        super();

        this.state = {
            theme: ''
        }
    }

    goToNextStep() {
        store.dispatch(updateSettings({userName: this.state.userName}));
        //Actions.login_step2()
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={styles.text}>Select the skin theme</Text>
                    <Picker
                        selectedValue={this.state.theme}
                        style={{ height: 10, width: 320, borderColor: 'red' }}
                        itemStyle={{borderColor: 'red'}}
                        onValueChange={(itemValue, itemIndex) => this.setState({theme: itemValue})}>
                        <Picker.Item label="Dark" value="dark"/>
                        <Picker.Item label="Light" value="light"/>
                    </Picker>
                    <Button title={'Next'} onPress={this.goToNextStep.bind(this)} />
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 72,
        color: S.colorRed,
        marginBottom: 30,
    },
    text: {
        fontSize: 22,
        paddingHorizontal: 40,
        marginBottom: 30,
        color: '#c1c1c1'
    },
    input: {
        height: 40, 
        borderColor: '#eee',
        borderBottomWidth: 1,
        width: '80%',
        fontSize: 16,
        color: '#c1c1c1',
        textAlign: 'center',
        marginBottom: 30,
    }
});