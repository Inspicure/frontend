import * as qs from 'query-string';
const apiServer = 'http://localhost:5000';

const post = async (route, payload) => {
  const fetchResult = await fetch(`${apiServer}/${route}`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      ['Content-Type']: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (fetchResult.ok) {
    const text = await fetchResult.text();
    return JSON.parse(text);
  }
  console.log(
    `POST call to /${route} errored with status ${fetchResult.status}`,
  );
  return;
};

const get = async (route, params) => {
  let url = `${apiServer}/${route}`;
  url += `?${qs.stringify(params)}`;
  const fetchResult = await fetch(url, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      ['Content-Type']: 'application/json',
    },
  });
  if (fetchResult.ok) {
    const text = await fetchResult.text();
    return JSON.parse(text);
  }
  console.log(
    `GET call to /${route} errored with status ${fetchResult.status}`,
  );
  return;
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
