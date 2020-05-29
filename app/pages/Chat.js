import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, Text, TextInput } from 'react-native-paper';
import {SafeAreaView, View} from "react-native";
import {padding} from "app/theme"

const Chat = ({ route, navigation }) => {
return (
  <SafeAreaView style={{flex: 1}}>
    <View style={{flexGrow: 1}}>
      <Text>{route.params.hallway.title}</Text>
    </View>

    <View style={{flexDirection: "row", paddingHorizontal: padding.single}}>
      <TextInput label="Enter message" mode="outlined" style={{flexGrow: 1}} />
      <IconButton icon="send" size={40} />
    </View>

  </SafeAreaView>
  );
};

Chat.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }).isRequired, // eslint killin me
};

export default Chat;
