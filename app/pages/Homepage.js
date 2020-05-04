import React from 'react';
import {
  ActivityIndicator,
  Appbar,
  Button,
  IconButton,
  Menu,
  Text,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import useAsyncStorage from 'app/hooks/storage';
import { STORAGE_KEYS } from 'app/constants';

const Homepage = ({ navigation }) => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  // React.useEffect(() => {
  //   console.log(`effect triggered with ${JSON.stringify(userData)}`);
  //   if (
  //     userData.ready &&
  //     !(userData.id && userData.token)
  //   ) {
  //     console.log("navigating back")
  //     navigation.navigate('Sign In');
  //   }
  // }, [navigation, userData]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerTitle: 'hi',
    });
  }, [navigation]);
  return (
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
      <Text>You&apos;re home!</Text>
      {/* <Text>{`hellooo ${userData.token}`}</Text> */}
      {/* {userData && userData.ready ? (
        <>
          {console.log("user data ready")}
          <Text>im ready now</Text>
          <Button
            onPress={() => {
              setUserData({ready: true})
            }}
          >
            Logout
          </Button>
          <Button
            onPress={() => {
              navigation.navigate('Chat');
            }}
          >
            Go to chat
          </Button>
        </>
      ) : (
        <>
          {console.log("user data not ready")}
          <ActivityIndicator animating />
        </>
      )} */}
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
