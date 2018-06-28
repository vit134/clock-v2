import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Icon } from 'native-base';

import store from '../../store';
import { updateSettings } from '../../actions';

import * as S from 'globalStyles';

export default class LoginStep2 extends Component {
    constructor() {
        super();

        this.state = {
            theme: 'light'
        }

        this.switchRadio = this.switchRadio.bind(this);
    }

    goToNextStep() {
        store.dispatch(updateSettings({theme: this.state.theme}));
        Actions.login_step3();
    }

    switchRadio(value) {
        if (this.state.theme === value) return;

        this.setState({
            theme: value
        });
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={styles.text}>Select the skin theme</Text>
                    <View style={styles.radio}>
                        <TouchableHighlight
                            underlayColor={'rgba(255,255,255, 0)'}
                            onPress={() => this.switchRadio('dark')}
                            style={[styles.radioButton, styles.radioButtonLeft, this.state.theme === 'dark' ? {backgroundColor: '#eee'} : {}]}>
                            <Text style={styles.radioButtonText}>Dark</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'rgba(255,255,255, 0)'}
                            onPress={() => this.switchRadio('light')}
                            style={[styles.radioButton, this.state.theme === 'light' ? {backgroundColor: '#eee'} : {}]}>
                            <Text style={styles.radioButtonText}>Light</Text>
                        </TouchableHighlight>
                    </View>
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