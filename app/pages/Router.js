import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useSelector} from "react-redux"
import CreateNewHallway from 'app/pages/CreateNewHallway';
import Chat from 'app/pages/Chat';
import Homepage from 'app/pages/Homepage';
import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const wrapComponent = (component, name, isModal=false) => {
  return () => {
    return (
      <Stack.Navigator initialRouteName={name}>
        <Stack.Screen
          name={name}
          options={({ navigation }) => ({
            headerLeft: () => (
              <IconButton
                icon={isModal ? "keyboard-backspace" : "menu"}
                onPress={() => {
                  if (isModal) {
                    navigation.goBack()
                  } else {
                    navigation.toggleDrawer()
                  }
                }}
              />
            ),
            drawerLabel: () => null
          })}
          component={component}
        />
      </Stack.Navigator>
    )
  }
}


const Router = () => {
  const hallways = useSelector((state) => {return state.hallways.hallwayMemberships});
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        options={{ title: 'Hallways' }}
      >
        {wrapComponent(Homepage, "Hallways")}
      </Drawer.Screen>
      <Drawer.Screen name="Chat">{wrapComponent(Chat, "Chat")}</Drawer.Screen>
      <Drawer.Screen
        name="CreateNewHallway"
        options={{
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null
        }}
      >
        {wrapComponent(({navigation}) => {return <CreateNewHallway navigation={navigation} />}, "CreateNewHallway", true)}
      </Drawer.Screen>
      {hallways.map((hallway) => {
        return <Drawer.Screen name={hallway.title}>{wrapComponent(Chat, "Chat")}</Drawer.Screen>
      })}
    </Drawer.Navigator>
  );
};

Router.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
};

export default Router;
