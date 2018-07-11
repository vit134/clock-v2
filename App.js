import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from './app/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionsRedux from './app/actions';

import { Font } from 'expo';

import RootComponent from './app/containers/Root';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
      Font.loadAsync({
        'DSEG': require('./app/assets/fonts/DSEG7Classic-Regular.ttf'),
        'DSEG-light': require('./app/assets/fonts/DSEG7Classic-Light.ttf'),
        'DSEG-bold': require('./app/assets/fonts/DSEG7Classic-Bold.ttf'),
        //'digital': require('./app/assets/fonts/digital-7.ttf')
        'digital': require('./app/assets/fonts/7segment.ttf')
      }).then(() => this.setState({loading: false}));
  }

  render() {
    if (!this.state.loading) {
      return (
        <Provider store={store}>
          <RootComponent />
        </Provider>
      )
    } else {
      return (
        <View></View>
      )
    }
  }
}

export default App;