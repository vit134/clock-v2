import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionsRedux from './app/actions';

import RootComponent from './app/containers/Root';

class App extends Component {
  constructor() {
    super();
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