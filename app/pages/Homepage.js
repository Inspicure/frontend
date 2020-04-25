import React from 'react';
import PropTypes from 'prop-types';
import {
  Appbar,
  Button,
  Subheading,
  Title,
  TextInput,
} from 'react-native-paper';
import { Platform, KeyboardAvoidingView, View } from 'react-native';
import { Redirect } from 'react-router-native';
import * as Keychain from 'react-native-keychain';

const Homepage = () => {
  const [loading, setLoading] = React.useState(true);
  const [credentials, setCredentials] = React.useState(null);
  React.useEffect(() => {
    const loadCredentialsFromKeychain = async () => {
      const savedCredentials = await Keychain.getGenericPassword();
      setCredentials(savedCredentials);
      setLoading(false);
    };
    loadCredentialsFromKeychain();
  }, [setCredentials]);

  // redirect to signup if no credentials in keychain
  return !loading && !credentials ? (
    <Redirect to={{ pathname: '/signup' }} />
  ) : (
    <Appbar.Header>
      <Appbar.Content title="Home" />
    </Appbar.Header>
  );
};

Homepage.propTypes = {
  userId: PropTypes.string.isRequired,
  accessToken: PropTypes.string, // TODO: make this required once we can auth
};

export default Homepage;
