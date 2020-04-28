import React from 'react';
import { Button, Title, TextInput } from 'react-native-paper';
import { Platform, KeyboardAvoidingView, View } from 'react-native';
import { signIn } from '../api';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const history = useHistory();
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
            secureTextEntry={true}
          />
        </View>
        <Button
          mode="contained"
          onPress={async () => {
            setButtonLoading(true);
            await signIn(email, pass);
            setButtonLoading(false);
          }}
          disabled={!(email && pass)}
          loading={buttonLoading}
        >
          Sign in
        </Button>
        <Button
          onPress={() => {
            history.push('/signup');
          }}
        >
          Sign up
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signin;
