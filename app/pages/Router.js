import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  WrappedChat,
  WrappedHomepage,
  WrappedCreateNewHallway,
} from 'app/pages/WrappedPages';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

const Drawer = createDrawerNavigator();

const Router = () => {
  return (
    <Drawer.Navigator initialRouteName="Home2">
      <Drawer.Screen
        name="Home2"
        component={WrappedHomepage}
        options={{ title: 'Hallways' }}
      />
      <Drawer.Screen name="Chat" component={WrappedChat} />
      <Drawer.Screen
        name="CreateNewHallway"
        component={WrappedCreateNewHallway}
      />
    </Drawer.Navigator>
  );
};

Router.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
};

export default Router;
