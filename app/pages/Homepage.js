import React from 'react';
import {
  Button,
  IconButton,
  Text,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from 'app/redux/ducks/user';

const Homepage = ({ navigation }) => {
  const dispatch = useDispatch();
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
    <>
      <Text>You&apos;re home!</Text>
      <Button onPress={() => dispatch(signOut())} mode="contained" compact>Sign Out</Button>
    </>
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
