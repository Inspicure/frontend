import React from "react"
import {Appbar, Text} from "react-native-paper"
import {SafeAreaView} from "react-native"

const Lounge = ({navigation}) => {
    return (
      <SafeAreaView>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content
            title="Lounge"
            subtitle="What's on your mind?"
          />
        </Appbar.Header>
        <Text>Lounge</Text>
      </SafeAreaView>
)
}

export default Lounge;