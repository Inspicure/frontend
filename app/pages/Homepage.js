import React from 'react';
import {
  IconButton,
  Text,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const Homepage = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerTitle: 'Hallways',
    });
  }, [navigation]);
  return (
    <Text>You&apos;re home!</Text>
  );
};

Homepage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }).isRequired, // eslint killin me
};

export default Homepage;
