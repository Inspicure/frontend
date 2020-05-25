import React from 'react';
import {
  Button,
  Subheading,
  Title,
  TextInput,
} from 'react-native-paper';
import { Platform, KeyboardAvoidingView, View } from 'react-native';
import PropTypes from 'prop-types';
import { signUpAndSaveToken } from 'app/redux/ducks/auth';
import { useDispatch } from 'react-redux';

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [buttonLoading, setButtonLoading] = React.useState(false);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Title>Murmo</Title>
      <Subheading>where physicians collaborate</Subheading>
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
          <TextInput
            label="First name"
            onChangeText={setFirstName}
            style={{ width: 300 }}
          />
          <TextInput
            label="Last name"
            onChangeText={setLastName}
            style={{ width: 300 }}
          />
        </View>
        <Button
          mode="contained"
          onPress={async () => {
            setButtonLoading(true);
            await dispatch(
              signUpAndSaveToken(email, pass, firstName, lastName),
            );
            setButtonLoading(false);
          }}
          disabled={!(email && pass && firstName && lastName)}
          loading={buttonLoading}
        >
          Sign up
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('Sign In');
          }}
        >
          Sign in
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

Signup.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired, // eslint killin me
};

export default Signup;
