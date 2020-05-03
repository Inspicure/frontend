import React from 'react';
import { Button, Title, TextInput } from 'react-native-paper';
import { Platform, KeyboardAvoidingView, View } from 'react-native';
import {PropTypes} from "prop-types"
import { STORAGE_KEYS } from 'app/constants';
import { signin } from 'app/api';
import useAsyncStorage from 'app/hooks/storage';

const Signin = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const memoizedStartValue = React.useMemo(() => {return {ready: true}},[])
  const [, setUserData] = useAsyncStorage(STORAGE_KEYS.USER_DATA, memoizedStartValue)
  // const [, , updateUserId] = useAsyncStorage(STORAGE_KEYS.USER_ID);
  // const [, , updateAuthToken] = useAsyncStorage(
  //   STORAGE_KEYS.AUTH_TOKEN,
  // );

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Title>Login to Murmo</Title>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ marginVertical: 50 }}>
          <TextInput
            label="Email"
            onChangeText={setEmail}
            style={{ width: 300 }}
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            onChangeText={setPass}
            style={{ width: 300 }}
            secureTextEntry
          />
        </View>
        <Button
          mode="contained"
          onPress={async () => {
            setButtonLoading(true);
            setUserData({ready: false})
            const response = await signin(email, pass);
            if (response.token && response.id) {
              await setUserData({id: response.id.toString(), token: response.token, ready: true})
              navigation.navigate("Home");
            } else {
              setUserData({ready: true})
            }
            setButtonLoading(false);
          }}
          disabled={!(email && pass)}
          loading={buttonLoading}
        >
          Sign in
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("Sign Up")
          }}
        >
          Sign up
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

Signin.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired, // eslint killin me
};

export default Signin;
