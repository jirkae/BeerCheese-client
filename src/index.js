import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { configureStore } from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <App store={store} />,
    document.getElementById('root'),
);
