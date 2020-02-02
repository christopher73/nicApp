import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import AppNavigation from './src/components/Navigation/AppNavigation';
// import config from './config';
// console.log(config.API_URL);
// console.log(config.ANALYTICS_KEY);
// const prefix = 'nicapp://';
// <AppNavigation uriPrefix={prefix} />

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
