import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Container, Content, Icon, Button } from 'native-base';

import { gs, colorRed } from 'globalStyles';
import NavBar from '../NavBar';

export default class SettingsUser extends Component{
    render() {
        return(
            <Container>
                <Content style={gs.container}>
                    <View style={{borderColor: '#eee', borderBottomWidth: 1}}>
                        <Image source={require('./default_avatar.png')} style={styles.image}/>
                        <View style={styles.userName}><Text style={styles.userNameText}>Vitaliy Andryushkov</Text></View>
                    </View>
                    <View style={styles.content}>
                        <Button block dark>
                            <Text style={styles.buttonText}>Change avatar</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        borderColor: '#eee',
        borderBottomWidth: 1
    },
    userName: {
        position: 'absolute',
        left: 20,
        bottom: 20
    },
    userNameText: {
        fontSize: 24,
        color: colorRed
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    buttonText: {
        color: '#fff'
    }
});