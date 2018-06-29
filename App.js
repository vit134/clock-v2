import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, AsyncStorage, View, Text } from 'react-native';
import { Icon } from 'native-base';

import store from './app/store';
import { updateSettings } from './app/actions';

import Alarm from './app/components/alarm';
import AlarmAdd from './app/components/alarmAdd';
import AlarmTitleModal from './app/components/alarmTitleModal';
import AlarmRepeatModal from './app/components/alarmRepeatModal';

import LoginHello from './app/components/Login/LoginHello';
import LoginStep1 from './app/components/Login/LoginStep1';
import LoginStep2 from './app/components/Login/LoginStep2';
import LoginStep3 from './app/components/Login/LoginStep3';
import LoginStep4 from './app/components/Login/LoginStep4';

import Settings from './app/components/Settings/Settings';

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

export default class App extends Component {
    constructor() {
      super();

      this.state = {
        first: true
      }

      this.mounted = false;
      
    }

    componentWillMount() {
      getKey('settings').then((value) => {
        console.log('storage settings value', value);
        if (value && Object.keys(value).length > 0) {
          this.mounted = true;
          store.dispatch(updateSettings({...JSON.parse(value)}));
        }
      })
    }

    componentDidMount() {
      if (this.mounted) {
        this.setState({first: false});
      }
    }

    render() {
      console.log(this.state.first)
        return (
            <Provider store={store}>
              <Router>
                <Scene key="home" hideNavBar>
                  <Scene initial={this.state.first ? true : false} key="login" back={true} backTitle={'Back'} navigationBarStyle={styles.loginNavigationBarStyle}>
                    <Scene key="login_hello" initial component={LoginHello} hideNavBar/>
                    <Scene key="login_step1" component={LoginStep1}/>
                    <Scene key="login_step2" component={LoginStep2}/>
                    <Scene key="login_step3" component={LoginStep3}/>
                    <Scene key="login_step4" component={LoginStep4}/>
                  </Scene>
                  <Scene initial={this.state.first ? false : true} key="tabbar" tabs tabBarStyle={styles.tabBarStyle} navigationBarStyle={styles.navigationBarStyle} labelStyle={styles.label}>
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
            </Provider>
          )
    }
}

const styles = StyleSheet.create({
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