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
  const text = await fetchResult.text();
  if (fetchResult.ok) {
    return JSON.parse(text);
  }
  console.log(
    `POST call to /${route} errored with status ${fetchResult.status}`,
  );
  return;
};

export const signupNewUser = (
  email,
  password,
  firstName,
  lastName,
) => {
  // this is stale, why??? :(
  console.log(`called with ${email}`);
  return post('signup', { email, password, firstName, lastName });
};
