import React from 'react';
import { Button, Title, TextInput } from 'react-native-paper';
import { Platform, KeyboardAvoidingView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

import { loginAndSaveToken } from 'app/redux/ducks/user';

const Signin = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const dispatch = useDispatch();

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
            const response = await dispatch(
              loginAndSaveToken(email, pass),
            );
            setButtonLoading(false);
          }}
          disabled={!(email && pass)}
          loading={buttonLoading}
        >
          Sign in
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('Sign Up');
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
