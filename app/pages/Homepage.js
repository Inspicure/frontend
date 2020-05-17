import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, FAB, IconButton, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { margin } from 'app/theme';

import { signOutAndClearToken } from 'app/redux/ducks/user';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: margin.double,
    right: 0,
    bottom: 0,
  },
});

const Homepage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.jumpTo('CreateNewHallway');
        }}
      />
      <Text>You&apos;re home!</Text>
      <Button
        onPress={() => dispatch(signOutAndClearToken())}
        mode="contained"
        compact
      >
        Sign Out
      </Button>
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
