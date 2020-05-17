import PropTypes from 'prop-types';
import React from 'react';
import CreateNewHallway from 'app/pages/CreateNewHallway';
import Chat from 'app/pages/Chat';
import Homepage from 'app/pages/Homepage';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

const WrapNavigator = ({ component, name }) => {
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
        component={component}
      />
    </Stack.Navigator>
  );
};

WrapNavigator.propTypes = {
  component: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

// TODO: consider merging into one extensible wrapper
const WrapModal = ({ component, name }) => {
  return (
    <Stack.Navigator initialRouteName={name}>
      <Stack.Screen
        name={name}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton
              icon="keyboard-backspace"
              onPress={() => navigation.goBack()}
            />
          ),
          drawerLabel: () => null
        })}
        component={component}
      />
    </Stack.Navigator>
  );
};

WrapModal.propTypes = {
  component: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

export const WrappedHomepage = () => {
  return <WrapNavigator component={Homepage} name="Hallways" />;
};

export const WrappedChat = () => {
  return <WrapNavigator component={Chat} name="Chat" />;
};

export const WrappedCreateNewHallway = () => {
  return (
    <WrapModal
      component={CreateNewHallway}
      name="Create new hallway"
    />
  );
};
