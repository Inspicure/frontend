import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  WrappedChat,
  WrappedHomepage,
  WrappedCreateNewHallway,
} from 'app/pages/WrappedPages';
import PropTypes from 'prop-types';

const Drawer = createDrawerNavigator();

const Router = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={WrappedHomepage}
        options={{ title: 'Hallways' }}
      />
      <Drawer.Screen name="Chat" component={WrappedChat} />
      <Drawer.Screen
        name="CreateNewHallway"
        component={WrappedCreateNewHallway}
        options={{
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null
        }}
      />
    </Drawer.Navigator>
  );
};

Router.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
};

export default Router;
