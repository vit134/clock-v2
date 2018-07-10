import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionsRedux from './app/actions';

import { Font } from 'expo';

import RootComponent from './app/containers/Root';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
      Font.loadAsync({
        'DSEG': require('./app/assets/fonts/DSEG7Classic-Regular.ttf'),
        'DSEG-light': require('./app/assets/fonts/DSEG7Classic-Light.ttf'),
        'DSEG-bold': require('./app/assets/fonts/DSEG7Classic-Bold.ttf'),
        'digital': require('./app/assets/fonts/digital-7.ttf')
      });
  }

  render() {
    return (
      <Provider store={store}>
        <RootComponent />
      </Provider>
    )
  }
}

export default App;