import React from "react";
import Chat from "app/pages/Chat";
import Homepage from "app/pages/Homepage";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const wrapNavigator = (component, name) => {
    return (
      <Stack.Navigator
        initialRouteName={name}
      >
        <Stack.Screen
          name={name}
        >
          {component}
        </Stack.Screen>
      </Stack.Navigator>
      )
}

export const WrappedHomepage = () => {
    return wrapNavigator(Homepage, "Home");
}

export const WrappedChat = () => {
    return wrapNavigator(Chat, "Chat");
}