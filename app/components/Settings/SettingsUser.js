import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput
} from 'react-native';
import { Container, Content, Icon, Button } from 'native-base';

import { gs, colorRed } from 'globalStyles';
import NavBar from '../NavBar';

import store from '../../store';
import { changeSettings } from '../../actions';

export default class SettingsUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...store.getState().settingsReducer,
            focus: false
        }
    }

    onFocus() {
        this.setState({focus: true})
    }

    onBlur() {
        this.setState({focus: false})
    }

    submit() {
        store.dispatch(changeSettings({userName: this.state.userName}, store.getState().settingsReducer));
    }

    render() {
        return(
            <Container>
                <Content style={gs.container}>
                    <View style={{borderColor: '#eee', borderBottomWidth: 1}}>
                        <Image source={require('./default_avatar.png')} style={styles.image}/>
                        <View style={styles.userName}>
                            {/* <Text style={styles.userNameText}>Vitaliy Andryushkov</Text> */}
                            <TextInput
                                style={[styles.userNameInput, this.state.focus ? styles.userNameInputFocus : {}]}
                                onChangeText={(userName) => this.setState({userName})}
                                value={this.state.userName}
                                onFocus={this.onFocus.bind(this)}
                                onBlur={this.onBlur.bind(this)}
                                onSubmitEditing={this.submit.bind(this)}
                            />
                            <Icon name="edit" style={[styles.userNameIcon, this.state.focus ? styles.userNameIconFocus : {}]} type={'Entypo'}/>
                        </View>
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
        display: 'flex',
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        left: 0,
        bottom: 20
    },
    userNameInput: {
        fontSize: 24,
        color: colorRed,
        marginRight: 40,
        //flex: 2
    },
    userNameInputFocus: {
        borderColor: colorRed,
        borderBottomWidth: 1
    },
    userNameIcon: {
        opacity: 1,
        color: colorRed,
        fontSize: 16,
        /* flex: 1,
        justifyContent: 'flex-end' */
    },
    userNameIconFocus: {
        opacity: 0
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