import * as qs from 'query-string';
import store from "app/redux";

const apiServer = 'http://localhost:5000';

const post = async (route, payload) => {
  const state = store.getState();
  const token = state.auth.userToken;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = token;
  }
  const fetchResult = await fetch(`${apiServer}/${route}`, {
    method: 'post',
    headers,
    body: JSON.stringify(payload),
  });

  if (fetchResult.ok) {
    const text = await fetchResult.text();
    return JSON.parse(text);
  }
  console.log(
    `POST call to /${route} errored with status ${fetchResult.status}`,
  );
  return null;


};

const get = async (route, params) => {
  let url = `${apiServer}/${route}`;
  url += `?${qs.stringify(params)}`;

  const state = store.getState();
  const token = state.auth.userToken;
  const headers =  {
    Accept: 'application/json',
  }
  if (token) {
    headers.Authorization = token;
  }
  const fetchResult = await fetch(url, {
    method: 'get',
    headers
  });
  if (fetchResult.ok) {
    const text = await fetchResult.text();
    return JSON.parse(text);
  }
  console.log(
    `GET call to /${route} errored with status ${fetchResult.status}`,
  );
  return null;

};

export const signupNewUser = (
  email,
  password,
  firstName,
  lastName,
) => {
  return post('signup', { email, password, firstName, lastName });
};

export const signin = (email, password) => {
  return get('signin', { email, password });
};

export const createHallway = (title, description, creatorId, tags, token) => {
  return post('create_hallway', {title, description, creatorId, tags, token});
}

export const getHallways = () => {
  return get('get_hallways');
}

export const getSubscriptions = () => {
  return get('get_subscriptions');
}