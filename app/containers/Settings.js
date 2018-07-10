import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionsRedux from '../actions';
import store from '../store';

import Settings from '../components/Settings/Settings';

class SettingsContainer extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount() {
        this.props.getSettings()
    }

    render(){
        return (
            <Settings />
        )
    }
}

function mapStateToProps(state, props) {
    return {...state.settingsReducer}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionsRedux, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);

