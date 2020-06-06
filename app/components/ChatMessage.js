import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
// import { Text } from "react-native-paper"
import {margin, padding} from "app/theme";

const ChatMessage = ({messageText}) => {
    return (
      <View style={{margin: margin.single,
      flexDirection: "row-reverse"}}
      >
        <Text style={{flexShrink: 1, backgroundColor:"pink", padding: padding.single}}>{messageText}</Text>
      </View>
    )
}
ChatMessage.propTypes = {
    messageText: PropTypes.string.isRequired,
}
export default ChatMessage;