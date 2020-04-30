/**
 * @format
 */

import 'react-native-gesture-handler'; // required by reactnavigation: https://reactnavigation.org/docs/getting-started
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import { name as appName } from './app.json';

const Main = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => Main);
