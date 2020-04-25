/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NativeRouter, Route, Link } from 'react-router-native';

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';

const App = () => {
  console.log(Homepage);
  console.log(Signup);
  return (
    <NativeRouter>
      <Route exact path="/" component={Homepage} />
      <Route path="/signup" component={Signup} />
    </NativeRouter>
  );
};

export default App;
