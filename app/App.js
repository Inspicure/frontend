/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { restoreAndSaveToken } from './redux/ducks/user';

import Router from './pages/Router';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => {
    return state.loading;
  });
  const userToken = useSelector((state) => {
    return state.userToken;
  });

  React.useEffect(() => {
    // Fetch the token from storage and maybe save to redux
    restoreAndSaveToken(dispatch);
  }, [dispatch]);
  return (
    <Stack.Navigator initialRouteName="Sign Up">
      {loadingState && (
        <Stack.Screen
          name="Loading"
          component={<ActivityIndicator />}
        />
      )}
      {userToken ? (
        <Stack.Screen name="Home" component={Router} />
      ) : (
        <>
          <Stack.Screen name="Sign In" component={Signin} />
          <Stack.Screen name="Sign Up" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
