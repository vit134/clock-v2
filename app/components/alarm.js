import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Switch,
    ActivityIndicator,
    Button,
    Text,
    Animated,
    TouchableHighlight,
    ScrollView,
    AsyncStorage
} from 'react-native';

import { Container, Content, Icon } from 'native-base';
import Swipeable from 'react-native-swipeable';
import { Actions } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../store';
import * as ActionsRedux from '../actions';

import { gs , colorRed } from 'globalStyles';
import NavBar from './NavBar';

class Alarm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.unsubscribe = store.subscribe(() => {});
        this.renderItem = this.renderItem.bind(this);
        this.offScroll = this.offScroll.bind(this);
    }

    componentDidMount() {
        this.props.getData();
    }

    offScroll(value) {
        this.setState({
            isSwiping: value
        })
    }

    render() {
        return (
            <Container style={gs.container}>
                <NavBar 
                    title={'Alarm'} 
                    rightAction={() => Actions.alarmAdd({new: true})} 
                    rightTitle={'Add'}
                    leftTitle={'Change'}
                />
                { this.props.data.length > 0 
                ? 
                    <ScrollView scrollEnabled={!this.state.isSwiping} style={{minHeight: '100%'}}>
                        { this.props.loading 
                        ? 
                            <View style={styles.activityIndicatorContainer}>
                                <ActivityIndicator animating={true}/>
                            </View>
                        :
                            
                            <FlatList
                                ref='listRef'
                                data={this.props.data}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => {
                                    return item.id.toString()
                                }}
                            />
                        }
                    </ScrollView>
                :
                    <View style={[gs.container, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Text>No alarms</Text>
                    </View>
                }
            </Container>
        )
    }

    renderItem({item, index}) { 
        return <AlarmItem {...item} offScroll={this.offScroll}/>
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
        this.setState({switchEnabled: value});
    }

    removeAlarm() {
        store.dispatch(ActionsRedux.removeAlarm(this.props.id));
    }

    changeAlarm() {
        Actions.alarmAdd({new: false, ...this.props});
    }
    
    render() {
        return (
            <Swipeable 
                rightButtons={[<TouchableHighlight style={styles.swipeButtonRight} onPress={this.removeAlarm.bind(this)}><Text style={styles.swipeButtonText}>Delete</Text></TouchableHighlight>]} 
                leftButtons={[<TouchableHighlight style={styles.swipeButtonLeft} onPress={this.changeAlarm.bind(this)}><Icon name={'ios-remove-circle'} style={{fontSize: 30, color: colorRed}} /></TouchableHighlight>]} 
                rightButtonWidth={80}
                onSwipeStart={() => this.props.offScroll(true)}
                onSwipeRelease={() => this.props.offScroll(false)}
            >
                <View style={styles.alarmItem}>
                    <View>
                        <Text style={styles.alarmItemTime}>{this.props.timeTitle}</Text>
                        <Text style={styles.alarmItemTitle}>{this.props.title} {this.props.repeatTitle ? `, ${this.props.repeatTitle}` : ''}</Text>
                    </View>
                    <View>
                        <Switch style={styles.alarmItemSwitch} onValueChange={this.toggleSwitch.bind(this)} value = {this.state.switchEnabled}/>
                    </View>
                </View>
            </Swipeable>
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

let styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    alarmItem: {
        borderColor: '#eee',
        borderBottomWidth: 1,
        height: 85,
        paddingTop: 7,
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
        //transform: [{scaleX: 1}, {scaleY: 1.2}]
    },
    swipeButtonRight: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        height: 85,
        backgroundColor: colorRed,
        borderColor: '#eee',
        borderBottomWidth: 1
    },
    swipeButtonLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
        height: 80,
        borderColor: '#eee',
        borderBottomWidth: 1
    },
    swipeButtonText: {
        color: '#fff'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alarm);