import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Subheading,
  Title,
  TextInput,
  Text,
} from 'react-native-paper';
import { Platform, KeyboardAvoidingView, View } from 'react-native';
import { Redirect } from 'react-router-native';
import useAsyncStorage from 'app/hooks/storage';
import { STORAGE_KEYS } from 'app/constants';

const Homepage = () => {
  console.log('hello 1');
  const [
    storedAuthToken,
    authTokenDataReady,
    ,
    clearAuthToken,
  ] = useAsyncStorage(STORAGE_KEYS.AUTH_TOKEN);

  const [
    storedUserId,
    userIdDataReady,
    ,
    clearUserId,
  ] = useAsyncStorage(STORAGE_KEYS.USER_ID);

  console.log('hello');

  console.log('render');
  console.log(storedAuthToken);
  console.log(authTokenDataReady);
  console.log(storedUserId);
  console.log(userIdDataReady);

  // redirect to signup if no credentials in keychain
  return !(authTokenDataReady && userIdDataReady) ? (
    <ActivityIndicator animating={true} />
  ) : !(storedAuthToken && storedUserId) ? (
    <Redirect to={{ pathname: '/signin' }} />
  ) : (
    <>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <Button
        onPress={() => {
          clearAuthToken();
          clearUserId();
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Homepage;
