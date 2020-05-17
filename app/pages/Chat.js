import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, Text } from 'react-native-paper';

const Chat = ({ navigation }) => {
  return <Text>I am chat</Text>;
};

Chat.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }).isRequired, // eslint killin me
};

export default Chat;
