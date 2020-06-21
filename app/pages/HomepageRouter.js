import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Homepage from 'app/pages/Homepage';
import Lounge from 'app/pages/Lounge';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Hallways" shifting>
      <Tab.Screen
        name="Hallways"
        component={Homepage}
        options={{
          tabBarIcon: 'home-account',
          tabBarColor: '#2a572e',
        }}
      />
      <Tab.Screen
        name="Lounge"
        component={Lounge}
        options={{
          tabBarIcon: 'forum',
          tabBarColor: '#694fad',
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
