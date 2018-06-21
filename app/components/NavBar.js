import React, { Component } from 'react';
import { Header, Title, Left, Right, Body, Text } from 'native-base';
import { StyleSheet, Button } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { colorRed } from 'globalStyles';

export default class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Header style={styles.container}>
                <Left>
                    {this.props.leftTitle && <Button color={colorRed} onPress={this.props.leftAction ? this.props.leftAction : () => {}} title={this.props.leftTitle} />}
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
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
