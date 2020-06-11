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
  const [users, setUsers] = React.useState({});
  const userId = useSelector((state) => {
    return state.auth.id;
  });
  const onPressSend = () => {
    sendChatMessage(chatMessage, userId, route.params.hallway._id);
    setChatMessage(null);
  };
  React.useEffect(() => {
    const loadMessages = async () => {
      const response = await getMessagesForHallway(
        route.params.hallway._id,
      );
      const userMap = response.users.reduce(
        (mapData, user) => ((mapData[user._id] = user), mapData),
        {},
      );
      setUsers(userMap);
      setMessages(response.messages);
    };
    loadMessages();
  }, [route.params.hallway._id]);

  const socketHandler = React.useCallback(
    (msg) => {
      const messageCopy = [...messages];
      messageCopy.push(msg.message);
      setMessages(messageCopy);
      if (!users[msg.user._id]) {
        const userCopy = { ...users };
        userCopy[msg.user._id] = msg.user;
        setUsers(userCopy);
      }
    },
    [messages, users],
  );

  socket.on(`chat-${route.params.hallway._id}`, socketHandler);

  let scrollViewRef = null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {messages.length > 0 && (
        <ScrollView
          ref={(ref) => {
            scrollViewRef = ref;
          }}
          onContentSizeChange={() =>
            scrollViewRef.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message) => {
            return (
              <ChatMessage
                messageData={message}
                userData={users[message.author_id]}
              />
            );
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
