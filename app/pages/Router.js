import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from "app/pages/Chat";
import { IconButton } from "react-native-paper";
import Homepage from "app/pages/Homepage";
import PropTypes from "prop-types";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NavigatorComponent = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
        >
          {Homepage}
        </Stack.Screen>
      </Stack.Navigator>
    )
}

const Router = () => {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={NavigatorComponent}

        />
        <Drawer.Screen name="Chat" component={Chat} />
      </Drawer.Navigator>
    )
}


Router.propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
      .isRequired,
  };

export default Router;