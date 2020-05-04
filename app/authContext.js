import React from "react";
import { signin } from 'app/api';

export const AuthContext = React.createContext(null);


// functions for auth context, require dispatch to be passed in
export default {
    authSignIn: async (data, dispatch) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({type: 'SET_LOADING'})
        const response = await signin(data.email, data.pass);
        if (response.token && response.id) {
            dispatch({ type: 'SIGN_IN', token: response.token, id: response.id});
        }
      },
    authSignOut: (dispatch) => {dispatch({ type: 'SIGN_OUT' })},
    authSignUp: async (data, dispatch) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data.token })
    }
}