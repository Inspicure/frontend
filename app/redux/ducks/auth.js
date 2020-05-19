// sourced largely from https://medium.com/swlh/the-good-the-bad-of-react-redux-and-why-ducks-might-be-the-solution-1567d5bdc698
// and https://github.com/erikras/ducks-modular-redux
import { signin, signupNewUser } from 'app/api';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_KEYS } from 'app/constants';

export const actionTypes = {
  restoreToken: 'RESTORE_TOKEN',
  signIn: 'SIGN_IN',
  signOut: 'SIGN_OUT',
  setLoading: 'SET_LOADING',
};

export const initialState = {
  isLoading: false,
  userToken: null,
  id: null,
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case actionTypes.restoreToken:
      return {
        ...prevState,
        userToken: action.payload.token,
        id: action.payload.id,
        isLoading: false,
      };
    case actionTypes.signIn:
      return {
        ...prevState,
        userToken: action.payload.token,
        id: action.payload.id,
        isLoading: false,
      };
    case actionTypes.signOut:
      return {
        ...prevState,
        userToken: null,
        id: null,
        isLoading: false,
      };
    case actionTypes.setLoading:
      return { ...prevState, isLoading: true };
    default:
      return { ...prevState };
  }
};

// action creators
export const restoreToken = (payload) => {
  return { type: actionTypes.restoreToken, payload };
};

export const signIn = (payload) => {
  return { type: actionTypes.signIn, payload };
};

export const signOut = () => {
  return { type: actionTypes.signOut };
};

export const setLoading = () => {
  return { type: actionTypes.setLoading };
};

// thunk action creators
export const loginAndSaveToken = (email, pass) => {
  return async (dispatch) => {
    dispatch(setLoading());
    const response = await signin(email, pass);
    if (response.token && response.id) {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({id: response.id, token: response.token}));
      return dispatch(
        signIn({ token: response.token, id: response.id }),
      );
    }
    return dispatch(signOut());
  };
};

export const signUpAndSaveToken = (email, pass, firstName, lastName) => {
  return async (dispatch) => {
    dispatch(setLoading());
    const response = await signupNewUser(email, pass, firstName, lastName);
    if (response.token && response.id) {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({id: response.id, token: response.token}));
      return dispatch(
        signIn({ token: response.token, id: response.id }),
      );
    }
    return dispatch(signOut());
  };
}

export const restoreAndSaveToken = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    const rawUserData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_DATA,
    );
    const userDataJson = JSON.parse(rawUserData);
    if (userDataJson && userDataJson.id && userDataJson.token) {
      await dispatch(
        restoreToken({
          token: userDataJson.token,
          id: userDataJson.id,
        }),
      );
    } else {
      await dispatch(signOut());
    }
    return 'done';
  };
};

export const signOutAndClearToken = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    await dispatch(signOut())
    return 'done';
  }
}
