import React from 'react';
import {
  ActivityIndicator,
  Appbar,
  Button,
  IconButton,
  Menu,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import useAsyncStorage from 'app/hooks/storage';
import { STORAGE_KEYS } from 'app/constants';

const Homepage = ({ navigation }) => {
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

  const [menuVisible, setMenuVisible] = React.useState(false);

  const dataReady = authTokenDataReady && userIdDataReady;

  React.useEffect(() => {
    if (dataReady && !(storedAuthToken && storedUserId)) {
      navigation.navigate('Sign In');
    }
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="menu"
          onPress={() => navigation.navigate('DrawerToggle')}
        />
      ),
      headerTitle: 'hellooooo',
    });
  }, [navigation]);

  return dataReady ? (
    <>
      <Appbar.Header>
        <Menu
          onDismiss={() => {
            setMenuVisible(false);
          }}
          visible={menuVisible}
          anchor={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Appbar.Action
              color="white"
              icon="airplane-takeoff"
              onPress={() => {
                setMenuVisible(true);
              }}
            />
          }
        >
          <Menu.Item onPress={() => {}} title="Item 1" />
        </Menu>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <IconButton
        icon="menu"
        onPress={() => navigation.toggleDrawer()}
      />
      <Button
        onPress={() => {
          clearAuthToken();
          clearUserId();
        }}
      >
        Logout
      </Button>
    </>
  ) : (
    <ActivityIndicator animating />
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
