import React from 'react';
import { Appbar } from 'react-native-paper';

const Signup = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Title" subtitle="Subtitle" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
};

export default Signup;
