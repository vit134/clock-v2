import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Alert,
    TouchableHighlight,
    Switch
} from 'react-native';
import { Font } from 'expo';
import { Container, Content, Icon, List, ListItem, Left, Right, Separator, Body, Picker, Thumbnail } from 'native-base';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionsRedux from '../../actions';
import store from '../../store';

import { gs, colorRed } from 'globalStyles';
import NavBar from '../NavBar';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.changeState = this.changeState.bind(this);
        this.resetAlert = this.resetAlert.bind(this);
    }

    changeState(key, value) {
        this.setState({
            [key]: value
        });
        
        store.dispatch(ActionsRedux.changeSettings({[key]: value}, store.getState().settingsReducer));

        console.log(store.getState())
    }

    resetAlert() {
        Alert.alert(
            'Reset settings',
            'Do you really want to reset the settings?',
            [
              {text: 'Yes', onPress: () => this.reset()},
              {text: 'No', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    }

    reset() {
        store.dispatch(ActionsRedux.resetSettings());
        Actions.login();
    }

    componentDidMount() {
        this.props.getSettings()
    }

    render() {
        const settings = this.props.settings;
        
        return (
            <Container style={gs.container}>
                <NavBar title={'Settings'} />
                <Content>
                    <TouchableHighlight onPress={() => Actions.settingsUser()}>
                        <View style={styles.user}>
                            <View style={styles.userBox}><Thumbnail square source={require('./default_avatar.png')} /></View>
                            <View style={[styles.userBox, styles.userBody]}><Text style={styles.userText}>{settings.userName}</Text></View>
                            <View style={[styles.userBox, styles.userRight]}><Icon name="arrow-forward" style={{color: colorRed, marginRight: 3}}/></View>
                        </View>
                    </TouchableHighlight>
                    <List>
                        <Separator bordered style={[styles.separator, styles.separatorNoBorderTop]}>
                            <Text style={styles.separatorTitle}>App</Text>
                        </Separator>
                        <ListItem picker style={styles.listItemPicker}>
                            <Left><Text>Color theme</Text></Left>
                            <Right>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" style={{color: colorRed, marginLeft: 10}}/>}
                                    style={styles.picker}
                                    headerStyle={styles.pickerHeader}
                                    placeholder="Light"
                                    placeholderStyle={styles.pickerPlaceholder}
                                    textStyle={styles.pickerText}
                                    placeholderIconColor="#007aff"
                                    selectedValue={settings.theme}
                                    onValueChange={(value) => this.changeState('theme', value)}
                                >
                                    <Picker.Item label="Light" value="light" />
                                    <Picker.Item label="Dark" value="dark" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <ListItem picker style={styles.listItemPicker}>
                            <Left><Text>Language</Text></Left>
                            <Right>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" style={{color: colorRed, marginLeft: 10}} />}
                                    style={styles.picker}
                                    headerStyle={styles.pickerHeader}
                                    placeholder="Ru"
                                    placeholderStyle={styles.pickerPlaceholder}
                                    textStyle={styles.pickerText}
                                    placeholderIconColor="#007aff"
                                    selectedValue={settings.language}
                                    onValueChange={(value) => this.changeState('language', value)}
                                >
                                    <Picker.Item label="Russian" value="ru" />
                                    <Picker.Item label="English" value="en" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <ListItem onPress={this.resetAlert} style={{borderBottomWidth: 0}}>
                            <Left><Text>Reset settings</Text></Left>
                            <Right><Icon name="alert" style={{color: colorRed}}/></Right>
                        </ListItem>
                        <Separator bordered style={styles.separator}>
                            <Text style={styles.separatorTitle}>Clock</Text>
                        </Separator>
                        <ListItem onPress={() => Actions.settingsTime()}>
                            <Left><Text>Time</Text></Left>
                            <Right><Icon name="arrow-forward" style={{color: colorRed, marginRight: 3}}/></Right>
                        </ListItem>
                        <ListItem picker style={styles.listItemPicker}>
                            <Left><Text>Time format</Text></Left>
                            <Right>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" style={{color: colorRed, marginLeft: 10}} />}
                                    style={styles.picker}
                                    headerStyle={styles.pickerHeader}
                                    placeholder="24H"
                                    placeholderStyle={styles.pickerPlaceholder}
                                    textStyle={styles.pickerText}
                                    placeholderIconColor="#007aff"
                                    selectedValue={settings.timeFormat}
                                    onValueChange={(value) => this.changeState('timeFormat', value)}
                                >
                                    <Picker.Item label="24H" value="24h" />
                                    <Picker.Item label="12H" value="12h" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <ListItem onPress={() => Actions.settingsFontColor()}>
                            <Left><Text>Font color</Text></Left>
                            <Right style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <View style={{width: 20, height: 20, marginRight: 10, borderRadius: 50, backgroundColor: `#${settings.fontColor || '222'}`}}></View>
                                <Icon name="arrow-forward" style={{color: colorRed, marginRight: 3}}/>
                            </Right>
                        </ListItem>
                        <ListItem onPress={() => Actions.settingsBrightness()}>
                            <Left><Text>Brightness</Text></Left>
                            <Right style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Text style={{marginRight: 10, fontSize: 16.5}}>{settings.brightness || 60}</Text>
                                <Icon name="arrow-forward" style={{color: colorRed, marginRight: 3}}/>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left><Text>Quiet mode</Text></Left>
                            <Right><Switch onValueChange={(value) => this.changeState('quiet_mode', value)} value={settings.quiet_mode}/></Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state, props) {
    return {settings: {...state.settingsReducer}};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionsRedux, dispatch);
}

const styles = StyleSheet.create({
    separator: {
        height: 40
    },
    separatorNoBorderTop: {
        borderTopWidth: 0
    },
    listItemPicker: {
        height: 50
    },
    picker: {
        width: undefined, 
        height: 40, 
        padding: 0 
    },
    pickerHeader: {
        paddingLeft: 20
    },
    pickerPlaceholder: {
        color: "#bfc6ea"
    },
    pickerText: {
        paddingRight: 0 
    },
    separatorTitle: {
        fontWeight: '500'
    },
    user: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 30,
        borderColor: '#eee',
        borderBottomWidth: 1
    },
    userBox: {
        flex: 1
    },
    userBody: {
        flex: 3
    },
    userRight: {
        justifyContent: 'flex-end', 
        alignItems: 'flex-end'
    },
    userText: {
        fontWeight: '500',
        fontSize: 18
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);