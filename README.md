# frontend
Client side

## environment setup
1. Follow the steps in the official documentation here: https://reactnative.dev/docs/environment-setup
2. Install yarn: https://classic.yarnpkg.com/en/docs/install#mac-stable

## run ios simulator
1. from `app` directory, run `yarn ios`.

## issues and how to solve them
### `ENFILE: file table overflow` during `yarn install`
Use the shell commands found here: https://github.com/reactioncommerce/reaction/issues/1938#issuecomment-284207213 to raise the open file limit on your mac.
