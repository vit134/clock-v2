import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Container, Content, Icon, List, ListItem, Left, Right, Separator, Body, Picker, Thumbnail } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { addAlarm, changeAlarm } from '../../actions';
import store from '../../store';

import * as S from 'globalStyles';
import NavBar from '../NavBar';
import Switch from '../Switch';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {...store.getState().settingsReducer};

        this.changeState = this.changeState.bind(this)
    }


    changeState(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        return (
            <Container style={S.gs.container}>
                <NavBar title={'Settings'} />
                <Content>
                    <View style={styles.user}>
                        <View style={styles.userBox}><Thumbnail square source={require('./default_avatar.png')} /></View>
                        <View style={[styles.userBox, styles.userBody]}><Text style={styles.userText}>{this.state.userName}</Text></View>
                        <View style={[styles.userBox, styles.userRight]}><Icon name="arrow-forward" style={{color: S.colorRed}}/></View>
                    </View>
                    <List>
                        <Separator bordered style={[styles.separator, styles.separatorNoBorderTop]}>
                            <Text style={styles.separatorTitle}>App</Text>
                        </Separator>
                        <ListItem picker>
                            <Left><Text>Color theme</Text></Left>
                            <Right>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ width: undefined, height: 40, padding: 0 }}
                                    placeholder="Light"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.theme}
                                    onValueChange={(value) => this.changeState('theme', value)}
                                >
                                    <Picker.Item label="Light" value="light" />
                                    <Picker.Item label="Dark" value="dark" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <ListItem picker style={{borderBottomWidth: 0}}>
                            <Left><Text>Language</Text></Left>
                            <Right>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ width: undefined, height: 40, padding: 0 }}
                                    placeholder="Ru"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.language}
                                    onValueChange={(value) => this.changeState('language', value)}
                                >
                                    <Picker.Item label="Russian" value="ru" />
                                    <Picker.Item label="English" value="en" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <Separator bordered style={styles.separator}>
                            <Text style={styles.separatorTitle}>Clock</Text>
                        </Separator>
                        <ListItem>
                            <Left><Text>Time</Text></Left>
                            <Right><Icon name="arrow-forward" style={{color: S.colorRed}}/></Right>
                        </ListItem>
                        <ListItem>
                            <Left><Text>Time format</Text></Left>
                            <Right><Icon name="arrow-forward" style={{color: S.colorRed}}/></Right>
                        </ListItem>
                        <ListItem>
                            <Left><Text>Font color</Text></Left>
                            <Right><Icon name="arrow-forward" style={{color: S.colorRed}}/></Right>
                        </ListItem>
                        <ListItem>
                            <Left><Text>Brightness</Text></Left>
                            <Right><Icon name="arrow-forward" style={{color: S.colorRed}}/></Right>
                        </ListItem>
                        <ListItem>
                            <Left><Text>Quiet mode</Text></Left>
                            <Right><Icon name="arrow-forward" style={{color: S.colorRed}}/></Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 40
    },
    separatorNoBorderTop: {
        borderTopWidth: 0
    },
    separatorTitle: {
        fontWeight: '500',
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