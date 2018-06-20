import React, { Component } from 'react';
import { Header, Title, Left, Right, Body, Text } from 'native-base';
import { StyleSheet } from 'react-native';

export default class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Header style={styles.container}>
                <Left><Text style={styles.buttons}>Reft</Text></Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right><Text style={styles.buttons}>Right</Text></Right>
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
