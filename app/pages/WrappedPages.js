import React from 'react';
import CreateNewHallway from 'app/pages/CreateNewHallway';
import Chat from 'app/pages/Chat';
import Homepage from 'app/pages/Homepage';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

const wrapNavigator = (component, name) => {
  return (
    <Stack.Navigator initialRouteName={name}>
      <Stack.Screen
        name={name}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton
              icon="menu"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      >
        {component}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export const WrappedHomepage = () => {
  return wrapNavigator(Homepage, 'Hallways');
};

export const WrappedChat = () => {
  return wrapNavigator(Chat, 'Chat');
};

export const WrappedCreateNewHallway = () => {
  return wrapNavigator(CreateNewHallway, 'Create new hallway');
};
