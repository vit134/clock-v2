import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Picker, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Icon } from 'native-base';

import store from '../../store';
import { updateSettings } from '../../actions';

import * as S from 'globalStyles';

async function saveKey(value) {
  try {
      await AsyncStorage.setItem('settings', JSON.stringify(value));
  } catch (error) {
      console.log("Error saving data" + error);
  }
}

export default class LoginStep4 extends Component {
    constructor() {
        super();
    }

    goToNextStep() {
        saveKey(store.getState().settingsReducer).then(() => Actions.tabbar());
        console.log(store.getState().settingsReducer);
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={styles.title}>Thank you</Text>
                    <Text style={styles.text}>Now you can start using the application</Text>
                    <Button title={'Start'} onPress={this.goToNextStep.bind(this)} />
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
    },
    radio: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        marginBottom: 30,
    },
    radioButton: {
        width: '50%',
        borderColor: '#eee',
        borderWidth: 2,
        paddingVertical: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 4,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 4,
    },
    radioButtonLeft: {
        borderRightWidth: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 0,
    },
    radioButtonText: {
        fontSize: 18,
        textAlign: 'center',
    }
});