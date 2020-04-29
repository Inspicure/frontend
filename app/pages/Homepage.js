import React from 'react';
import {
  ActivityIndicator,
  Appbar,
  Button,
} from 'react-native-paper';
import { Redirect } from 'react-router-native';
import useAsyncStorage from 'app/hooks/storage';
import { STORAGE_KEYS } from 'app/constants';

const Homepage = () => {
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
