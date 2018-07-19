import React, { Component } from 'react';
import { Header, Title, Left, Right, Body, Text } from 'native-base';
import { StyleSheet, Button } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { colorRed, theme } from 'globalStyles';

export default class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let barStyle = 'dark-content';
        if (this.props.settings && this.props.settings.theme === 'dark') {
            barStyle = 'light-content';
        }
        return(
            <Header iosBarStyle={barStyle} style={[styles.container, this.props.settings ? theme.bg[this.props.settings.theme] : {}]}>
                <Left>
                    {this.props.leftTitle && <Button color={colorRed} onPress={this.props.leftAction ? this.props.leftAction : () => {}} title={this.props.leftTitle} />}
                </Left>
                <Body>
                    <Title style={this.props.settings ? theme.text[this.props.settings.theme] : {}}>{this.props.title}</Title>
                </Body>
                <Right>
                    {this.props.rightTitle && <Button color={colorRed} onPress={this.props.rightAction ? this.props.rightAction : () => {}} title={this.props.rightTitle} />}
                </Right>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttons: {
      color: 'red'
  }
});
