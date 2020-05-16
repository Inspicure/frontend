/**
 * @format
 */

import 'react-native-gesture-handler'; // required by reactnavigation: https://reactnavigation.org/docs/getting-started
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from 'app/redux';
import App from 'app/App';
import { name as appName } from 'app/app.json';

const Main = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <App />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
