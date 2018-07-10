import React, { Component } from 'react';
import { Switch } from 'react-native';

export default class SwitchComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchEnabled: this.props.enabled,
        }
    }
    
    toggleSwitch(value) {
        this.setState({switchEnabled: value})

        if (this.props.cb) {
            this.props.cb(value);
        }
    }

    render(){
        return (
            <Switch onValueChange={this.toggleSwitch.bind(this)} value={this.state.switchEnabled}/>
        )
    }
}