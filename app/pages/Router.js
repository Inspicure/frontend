import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from "app/pages/Chat";
import { IconButton } from "react-native-paper";
import Homepage from "app/pages/Homepage";
import PropTypes from "prop-types";

const Drawer = createDrawerNavigator();

const Router = ({ navigation }) => {
    return (
      <Drawer.Navigator initialRouteName="Homepage">
        <Drawer.Screen name="Home" component={Homepage} />
        <Drawer.Screen name="Chat" component={Chat} />
      </Drawer.Navigator>
    )
}


Router.propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
      .isRequired,
  };

export default Router;