import React from 'react';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import {useDispatch, useSelector} from "react-redux"
import CreateNewHallway from 'app/pages/CreateNewHallway';
import Chat from 'app/pages/Chat';
import Homepage from 'app/pages/Homepage';
import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Title } from 'react-native-paper';
import {View} from "react-native";
import {padding} from "app/theme"
import { retrieveAndSaveHallwayMemberships } from 'app/redux/ducks/hallways';


// Use this list for modals that aren't supposed to be in the side menu
const HIDE_FROM_DRAWER = ["CreateNewHallway"];

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const wrapComponent = (component, name, isModal=false, params=null) => {
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
          })}
          component={component}
          initialParams={params}
        />
      </Stack.Navigator>
    )
  }
}

const CustomDrawerContent = (props) => {
  const processedRoutes = props.state.routes.filter((route) => {
    return !HIDE_FROM_DRAWER.includes(route.name)
  });
  return (
    <DrawerContentScrollView
      {...props}
    >
      <View style={{padding: padding.single}}>
        <Title>Joined hallways</Title>
        <DrawerItemList
          {...props}
          state={{...props.state,
          routes: processedRoutes
      }}
        />
      </View>
    </DrawerContentScrollView>
  )
}


const Router = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(retrieveAndSaveHallwayMemberships());
  },[dispatch])
  const hallways = useSelector((state) => {return state.hallways.hallwayMemberships});
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => {return <CustomDrawerContent {...props} />}}>
      <Drawer.Screen
        name="Home"
        options={{ title: 'Hallways' }}
      >
        {wrapComponent(Homepage, "Hallways")}
      </Drawer.Screen>
      <Drawer.Screen
        name="CreateNewHallway"
      >
        {wrapComponent(({navigation}) => {return <CreateNewHallway navigation={navigation} />}, "CreateNewHallway", true)}
      </Drawer.Screen>
      {hallways.map((hallway) => {
        return <Drawer.Screen name={hallway.title}>{wrapComponent(Chat, "Chat", false, {hallway})}</Drawer.Screen>
      })}
    </Drawer.Navigator>
  );
};

Router.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
};

export default Router;
