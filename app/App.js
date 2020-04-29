/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NativeRouter, Route } from 'react-router-native';

import Homepage from './pages/Homepage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App = () => {
  return (
    <NativeRouter>
      <Route exact path="/" component={Homepage} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
    </NativeRouter>
  );
};

export default App;
