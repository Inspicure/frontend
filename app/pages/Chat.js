import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { padding } from 'app/theme';
import { socket, sendChatMessage } from 'app/socketApi';
import { useSelector } from 'react-redux';
import { getMessagesForHallway } from 'app/api';
import ChatMessage from 'app/components/ChatMessage';

const Chat = ({ route }) => {
  const [chatMessage, setChatMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const userId = useSelector((state) => {
    return state.auth.id;
  });
  const onPressSend = () => {
    sendChatMessage(chatMessage, userId, route.params.hallway._id);
    setChatMessage(null);
  };
  React.useEffect(() => {
    const loadMessages = async () => {
      console.log(route.params.hallway._id)
      const response = await getMessagesForHallway(
        route.params.hallway._id,
      );
      setMessages(response);
    };
    loadMessages();
  }, [route.params.hallway._id]);

  socket.on(`chat-${route.params.hallway._id}`, (msg) => {
    const messageCopy = [...messages]
    messageCopy.push(msg)
    setMessages(messageCopy)

  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexGrow: 1 }}>
        <Text>{route.params.hallway.title}</Text>
      </View>
      {messages.length > 0 && (
        <ScrollView>
          {messages.map((message) => {
            return <ChatMessage messageText={message.text} />;
          })}
        </ScrollView>
      )}

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
