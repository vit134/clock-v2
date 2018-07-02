import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, AsyncStorage, View, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';

import store from '../store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionsRedux from '../actions';

import Alarm from '../components/alarm';
import AlarmAdd from '../components/alarmAdd';
import AlarmTitleModal from '../components/alarmTitleModal';
import AlarmRepeatModal from '../components/alarmRepeatModal';

import LoginHello from '../components/Login/LoginHello';
import LoginStep1 from '../components/Login/LoginStep1';
import LoginStep2 from '../components/Login/LoginStep2';
import LoginStep3 from '../components/Login/LoginStep3';
import LoginStep4 from '../components/Login/LoginStep4';

import Settings from '../components/Settings/Settings';

import { gs } from 'globalStyles';

const TabIcon = ({ focused, title, iconName }) => {
  const color = focused ? '#fc363b' : 'black';

  return (
    <Icon name={iconName} size={30} color={color} />
  );
}

async function getKey(key) {
  try {
      return await AsyncStorage.getItem(key);
  } catch (error) {
      console.log("Error retrieving data" + error);
  }
}

class Root extends Component {
    constructor() {
      super();
      this.unsubscribe = store.subscribe(() => {});

      this.state = {
        mounted: false,
        first: true
      }

      this.mounted = false;
      
    }

    componentDidMount() {
        this.props.getSettings();
    }

    render() {
      console.log('root props', this.props.first, this.props.loading)
      //console.log('root store', store.getState().settingsReducer)
      return (
        <View style={{height: '100%'}}>
            { this.props.loading 
            ?
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            :
                <Router>
                    <Scene key="home" hideNavBar>
                        <Scene initial={this.props.first ? true : false} key="login" back={true} backTitle={'Back'} navigationBarStyle={styles.loginNavigationBarStyle}>
                        <Scene key="login_hello" initial component={LoginHello} hideNavBar/>
                        <Scene key="login_step1" component={LoginStep1}/>
                        <Scene key="login_step2" component={LoginStep2}/>
                        <Scene key="login_step3" component={LoginStep3}/>
                        <Scene key="login_step4" component={LoginStep4}/>
                        </Scene>
                        <Scene initial={this.props.first ? false : true} key="tabbar" tabs tabBarStyle={styles.tabBarStyle} navigationBarStyle={styles.navigationBarStyle} labelStyle={styles.label}>
                        <Scene key="alarm" title="Alarm" iconName="ios-alarm" icon={TabIcon} >
                            <Scene key="alarm" component={Alarm} title="Alarm" hideNavBar />
                            <Scene key="alarmAdd" component={AlarmAdd} title="Add alarm" hideNavBar />
                            <Scene key="alarmTitleModal" component={AlarmTitleModal} direction="vertical" title="Title" hideNavBar />
                            <Scene key="alarmRepeatModal" component={AlarmRepeatModal} direction="vertical" hideNavBar />
                        </Scene>
                        <Scene  key="settings" title="Settings" iconName="ios-settings" icon={TabIcon} hideNavBar>
                            <Scene key="settings" component={Settings} title="Settings" />
                        </Scene>
                        </Scene>
                    </Scene>
                </Router>
            }
        </View>
      )
    }
}

function mapStateToProps(state, props) {
    return {...state.settingsReducer}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionsRedux, dispatch);
}

const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    tabBarStyle: {
        backgroundColor: '#fff',
        paddingTop: 5
    },
    navigationBarStyle: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    loginNavigationBarStyle: {
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 0
    },
    plusButtonStyle: {
        color: '#fc363b',
        fontWeight: 'bold',
        fontSize: 34
    },
    topButtons: {
        color: '#fc363b',
        fontSize: 16,
        marginTop: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);