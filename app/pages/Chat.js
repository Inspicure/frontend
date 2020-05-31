import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { SafeAreaView, View } from 'react-native';
import { padding } from 'app/theme';
import { sendChatMessage } from 'app/socketApi';
import { useSelector } from 'react-redux';

const Chat = ({ route }) => {
  const [chatMessage, setChatMessage] = React.useState('');
  const userId = useSelector((state) => {
    return state.auth.id;
  });
  const onPressSend = () => {
    // hallway.id doesn't exist yet since we don't have IDs on backend
    sendChatMessage(chatMessage, userId, route.params.hallway.id);
    setChatMessage(null);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexGrow: 1 }}>
        <Text>{route.params.hallway.title}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: padding.single,
        }}
      >
        <TextInput
          label="Enter message"
          mode="outlined"
          style={{ flexGrow: 1 }}
          value={chatMessage}
          onChangeText={setChatMessage}
        />
        <IconButton
          icon="send"
          size={40}
          disabled={!chatMessage}
          onPress={onPressSend}
        />
      </View>
    </SafeAreaView>
  );
};

Chat.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.func.isRequired,
  }).isRequired, // eslint killin me
};

export default Chat;
