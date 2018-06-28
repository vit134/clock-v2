import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Container, Content, Icon, List, ListItem, Left, Right, Separator, Body, Item, Picker } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { addAlarm, changeAlarm } from '../../actions';
import store from '../../store';

import * as S from 'globalStyles';
import NavBar from '../NavBar';
import Switch from '../Switch';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected2: 'light'
        };
    }


    onValueChange2(value) {
      this.setState({
        selected2: value
      });
    }

    render() {
        return (
            <Container style={S.gs.container}>
                <NavBar title={'Settings'} />
                <Content>
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
                                    selectedValue={this.state.selected2}
                                    onValueChange={this.onValueChange2.bind(this)}
                                >
                                    <Picker.Item label="Light" value="light" />
                                    <Picker.Item label="Dark" value="dark" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <ListItem style={{borderBottomWidth: 0}}>
                            <Left><Text>Language</Text></Left>
                            <Right><Icon name="arrow-forward" style={{color: S.colorRed}}/></Right>
                        </ListItem>
                        <Separator bordered style={styles.separator}>
                            <Text style={styles.separatorTitle}>Clock</Text>
                        </Separator>
                        <ListItem>
                            <Left><Text>Time</Text></Left>
                            <Right><Icon name="arrow-forward" style={{color: S.colorRed}}/></Right>
                        </ListItem>
                        <ListItem>
                            <Left><Text>Font color</Text></Left>
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
    }
});