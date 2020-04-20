module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'], // remove unused paper packages in prod. src: https://callstack.github.io/react-native-paper/getting-started.html
    },
  },
};
