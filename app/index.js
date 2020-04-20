/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { name as appName } from './app.json';

const Main = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
