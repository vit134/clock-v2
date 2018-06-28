import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, AsyncStorage, View, Text } from 'react-native';
import { Icon } from 'native-base';

import store from './app/store';
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

const initialStorage = {
  first: true,
  settingsClock: {
    color: 'red',
    brightness: 60,
    alarmVolume: 50
  },
  settingsApp: {
    theme: 'light',
    language: 'ru'
  }
}

async function getKey() {
  try {
      return await AsyncStorage.getItem('storage1');
  } catch (error) {
      console.log("Error retrieving data" + error);
  }
}

async function saveKey(value) {
  try {
      await AsyncStorage.setItem('storage1', value);
  } catch (error) {
      console.log("Error saving data" + error);
  }
}

export default class App extends Component {
    constructor() {
      super();

      this.state = {
        first: false
      }
    }

    componentDidMount() {
      let storage;

      getKey().then((value) => {
        if (!value) {
          saveKey(JSON.stringify(initialStorage))
            .then(() => {
              this.storage = JSON.parse(initialStorage);
            });
        } else {
          storage = JSON.parse(value);
          this.storage = storage;
          
          this.setState({first: storage.first});
        }

        
      })
    }

    render() {
        return (
            <Provider store={store}>
              <Router>
                <Scene hideNavBar>
                  <Scene key="login" back={true} backTitle={'Back'} navigationBarStyle={styles.loginNavigationBarStyle}>
                    <Scene key="login_hello" initial component={LoginHello} hideNavBar/>
                    <Scene key="login_step1" component={LoginStep1}/>
                    <Scene key="login_step2" component={LoginStep2}/>
                    <Scene key="login_step3" component={LoginStep3}/>
                    <Scene key="login_step4" component={LoginStep4}/>
                  </Scene>
                  <Scene initial key="tabbar" tabs tabBarStyle={styles.tabBarStyle} navigationBarStyle={styles.navigationBarStyle} labelStyle={styles.label}>
                    {/* <Scene key="Time" iconName="ios-timer" icon={TabIcon} title="Time">
                      <Scene key="time" component={Time} />
                    </Scene> */}
                    <Scene key="alarm" title="Alarm" iconName="ios-alarm" icon={TabIcon} >
                      <Scene key="alarm" component={Alarm} title="Alarm" hideNavBar />
                      <Scene key="alarmAdd" component={AlarmAdd} title="Add alarm" hideNavBar />
                      <Scene key="alarmTitleModal" component={AlarmTitleModal} direction="vertical" title="Title" hideNavBar />
                      <Scene key="alarmRepeatModal" component={AlarmRepeatModal} direction="vertical" hideNavBar />
                    </Scene>
                    <Scene initial key="settings" title="Settings" iconName="ios-settings" icon={TabIcon} hideNavBar>
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