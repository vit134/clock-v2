import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import store from './app/store'; //Import the store
import Alarm from './app/components/alarm' //Import the component file
import AlarmAdd from './app/components/alarmAdd' //Import the component file

const TabIcon = ({ focused, title, iconName }) => {
  const color = focused ? '#fc363b' : 'black';

  return (
    <Icon name={iconName} size={30} color={color} />
  );
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                  <Scene key="tabbar" tabs tabBarStyle={styles.tabBarStyle} navigationBarStyle={styles.navigationBarStyle} labelStyle={styles.label}>
                    {/* <Scene key="Time" iconName="ios-timer" icon={TabIcon} title="Time">
                      <Scene key="time" component={Time} />
                    </Scene> */}
                    <Scene key="alarm" initial title="Alarm" iconName="ios-alarm" icon={TabIcon} >
                      <Scene key="alarm" component={Alarm} title="Alarm" hideNavBar />
                      <Scene key="alarmAdd" component={AlarmAdd} title="Add alarm" hideNavBar />
                      {/* <Scene key="alarmTitleModal" component={AlarmTitleModal} direction="vertical" title="Title" hideNavBar />
                      <Scene key="alarmRepeatModal" component={AlarmRepeatModal} direction="vertical" hideNavBar /> */}
                    </Scene>
                    {/* <Scene key="settings" title="Settings" iconName="ios-settings" icon={TabIcon}>
                      <Scene key="settings" component={Settings} title="Settings" />
                    </Scene> */}
                  </Scene>
                </Router>
            </Provider>
        );
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