import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, Text } from 'react-native-paper';

const Chat = ({ route, navigation }) => {
return <Text>{route.params.hallway.title}</Text>;
};

Chat.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }).isRequired, // eslint killin me
};

export default Chat;
