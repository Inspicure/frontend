import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "react-native-paper"
import {margin} from "app/theme";

const ChatMessage = ({messageText}) => {
    return (
      <View style={{margin: margin.single}}>
        <Text>{messageText}</Text>
      </View>
    )
}
ChatMessage.propTypes = {
    messageText: PropTypes.string.isRequired,
}
export default ChatMessage;