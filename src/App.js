import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import './App.css';
import { createRoutes } from './createRoutes';

class App extends Component {
  render() {
    const { store } = this.props;
    const routes = createRoutes(store);
    return (
      <Provider store={store}>
        <Router history={browserHistory} >
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default App;
