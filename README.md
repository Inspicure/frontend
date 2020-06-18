# frontend
Client side

## environment setup
1. Follow the steps in the official documentation here: https://reactnative.dev/docs/environment-setup
2. Install yarn: https://classic.yarnpkg.com/en/docs/install#mac-stable
3. inside `app` directory, run `yarn install`.
4. inside `app` directory, run `yarn react-native link`.
4. inside `app/ios` directory, run `pod install`.
5. open `<ios-project>.xcodeproj` in xcode and go to Build Phases -> [CP] Copy Pods Resources, and check "Run script only when installing".
6. from `app` directory, run `yarn ios` and verify that app loads on simulator.

## run ios simulator
1. verify that environment setup above is completed.
2. from `app` directory, run `yarn ios`.

## issues and how to solve them
### `ENFILE: file table overflow` during `yarn install`
Use the shell commands found here: https://github.com/reactioncommerce/reaction/issues/1938#issuecomment-284207213 to raise the open file limit on your mac.
### Insufficient resources when starting simulator
Follow suggestions in https://stackoverflow.com/questions/46673050/unable-to-boot-device-due-to-insufficient-system-resources-using-xcode-9
