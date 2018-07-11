import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';
import { Container, Content } from 'native-base';

import { Actions } from 'react-native-router-flux';

import { gs } from 'globalStyles';
import NavBar from '../NavBar';

class AlarmTitleModal extends Component {
    constructor(props) {
        super(props);
        this.state = { text: props.title || 'Alarm' };
        this.submitState = this.submitState.bind(this);
    }

    submitState() {
        this.props.updateTitle(this.state.text);
        Actions.pop();
    }

    render() {
        return(
            <Container style={gs.container}>
                <NavBar 
                    title={'Title'} 
                    leftAction={() => Actions.pop()} 
                    leftTitle={'Cancel'}
                />
                <Content contentContainerStyle={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        autoFocus={true}
                        returnKeyType='done'
                        onSubmitEditing={this.submitState}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#eee',
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 20
    }
})
  
export default AlarmTitleModal;