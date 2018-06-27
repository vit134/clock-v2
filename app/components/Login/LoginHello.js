import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Icon } from 'native-base';

import * as S from 'globalStyles';

export default class LoginHello extends Component {
  render() {
    return (
        <Container>
            <View style={styles.container}>
                <Text style={styles.title}>Hello</Text>
                <Text style={styles.text}>To start working you need to configure the application</Text>
                <Button title={'Next'} onPress={() => Actions.login_step1()} />
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
    }
});