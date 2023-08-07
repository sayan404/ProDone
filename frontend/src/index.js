import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './Store'
import { Provider as AlertProvider, transitions, positions } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import { BrowserRouter as Router } from 'react-router-dom';

const options = {
timeout : 3000 ,
position : positions.BOTTOM_CENTER,
transition : transitions.SCALE
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options} >
      <Router>
        <App />
      </Router>
    </AlertProvider>
  </Provider>
);

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './Store'
import { Provider as AlertProvider, transitions, positions } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import { BrowserRouter as Router } from 'react-router-dom';

const options = {
timeout : 3000 ,
position : positions.BOTTOM_CENTER,
transition : transitions.SCALE
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options} >
      <Router>
        <App />
      </Router>
    </AlertProvider>
  </Provider>
);

*/