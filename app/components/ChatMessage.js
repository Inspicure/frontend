import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
// import { Text } from "react-native-paper"
import { margin, padding } from 'app/theme';
import moment from 'moment';

const ChatMessage = ({ messageData, userData }) => {
  return (
    <View
      style={{ margin: margin.single, flexDirection: 'row-reverse' }}
    >
      <View style={{ alignItems: 'flex-end' }}>
        <Text>
          Dr.{' '}
          {`${userData.last_name}-${moment(
            messageData.create_time,
          ).format('MMMM Do YYYY, h:mm:ss a')}`}
        </Text>
        <Text
          style={{
            flexShrink: 1,
            backgroundColor: 'pink',
            padding: padding.single,
          }}
        >
          {messageData.text}
        </Text>
      </View>
    </View>
  );
};
ChatMessage.propTypes = {
  messageData: PropTypes.shape({
    create_time: PropTypes.instanceOf(Date),
    text: PropTypes.string.isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    last_name: PropTypes.string.isRequired,
  }).isRequired,
};
export default ChatMessage;
