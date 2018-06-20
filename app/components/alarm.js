'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Switch,
    ActivityIndicator,
    Button
} from 'react-native';


import { Actions } from 'react-native-router-flux';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import store from '../store';

import * as ActionsRedux from '../actions';

class Alarm extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        

        this.unsubscribe = store.subscribe(() => console.log(store.getState()));

        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getData();
        console.log('alarm store', store.getState());
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            return (
                <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                    <FlatList
                        ref='listRef'
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}/>
                    <Button
                        onPress={() => Actions.alarmAdd()}
                        title="Add alarm"
                        color="#841584"
                    />
                </View>
            );
        }
    }

    renderItem({item, index}) {
        return <AlarmItem {...item} />
    }
};

class AlarmItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
          switchEnabled: this.props.enabled,
      }
    }
  
    toggleSwitch(value) {
      this.setState({switchEnabled: value})
    }
    
    render() {
      return (
        <View style={styles.alarmItem}>
          <View>
            <Text style={styles.alarmItemTime}>{this.props.time}</Text>
            <Text style={styles.alarmItemTitle}>{this.props.title}</Text>
          </View>
          <View>
            <Switch style={styles.alarmItemSwitch} onValueChange={this.toggleSwitch.bind(this)} value = {this.state.switchEnabled}/>
          </View>
        </View>
      )
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionsRedux, dispatch);
}

const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    alarmItem: {
        borderColor: '#eee',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    alarmItemTime: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#222'
    },
    alarmItemTitle: {
        color: '#222'
    },
    alarmItemSwitch: {
        marginTop: 10,
        transform: [{scaleX: 1.2}, {scaleY: 1.2}]
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alarm);