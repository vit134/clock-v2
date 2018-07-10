import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Container, Content, Icon, Button } from 'native-base';
import { gs, colorRed } from 'globalStyles';
import NavBar from '../NavBar';

import store from '../../store';
import { changeSettings } from '../../actions';

export default class SettingsFontColor extends Component{
    constructor(props){
        super(props);
        const state = store.getState().settingsReducer;
        this.state = {
            brightness: state.brightness || 60
        }
    }

    submit() {
        store.dispatch(changeSettings({brightness: this.state.brightness}, store.getState().settingsReducer));
        Actions.pop();
    }

    render() {
        return(
            <Container>
                <NavBar
                    leftTitle={'Back'}
                    leftAction={() => Actions.pop()}
                    title={'Brightness'}
                    rightTitle={'Save'}
                    rightAction={this.submit.bind(this)}
                />
                <View style={[gs.container, styles.container]}>
                    <View>
                        <Text style={styles.text}>{this.state.brightness}</Text>
                        <Slider 
                            maximumValue={100}
                            minimumValue={10}
                            step={10}
                            value={this.state.brightness}
                            onValueChange={(value) => this.setState({brightness: value})}
                        />
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: '100%'
    },
    text: {
        fontSize: 120,
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'digital',
    }
});