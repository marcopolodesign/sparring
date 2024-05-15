export default ({ config }) => {
  return {
    ...config,
    plugins: [
      // [
      //   '@sentry/react-native/expo',
      //   {
      //     url: 'https://sentry.io/',
      //     organization: 'sparring',
      //     project: 'sparringa',
      //   },
      // ],
      // '@react-native-firebase/app',
      'expo-font',
    ],
    hooks: {
      // postPublish: [
      //   {
      //     file: 'sentry-expo/upload-sourcemaps',
      //     config: {
      //       organization: 'ugo-argentina',
      //       project: 'ugo-argentina',
      //       authToken:
      //         '735f00d1c8f34f81bdd9dfeaac8d4076ba455fbcd37d43bb8e754489f959dfce',
      //       setCommits: true,
      //     },
      //   },
      // ],
    },
    // updates: {
    //   fallbackToCacheTimeout: 0,
    //   url: 'https://u.expo.dev/d4123f97-6ca8-4128-8872-eac90755fd3d',
    // },
    "runtimeVersion": "1.0.0",
    // name: process.env.NODE_ENV == 'prod' ? 'UGo!' : 'UGo! Test',
    name: 'Sparring',
    ios: {
      ...config.ios,
      bundleIdentifier:
        process.env.NODE_ENV == 'prod' ? 'com.sparringapp.Sparring' : 'sparring.test.dev',
        // 'ugo.test.dev',

      googleServicesFile: './GoogleService-Info.plist',
    },
    version: '1.10.20',
    android: {
      ...config.android,
      package:
        // process.env.NODE_ENV == 'prod' ? 'com.ugoapp.Ugo' : 'com.ugoapp.dev',
        'sparring.test.dev',
      googleServicesFile: './google-services-test.json',
      // process.env.NODE_ENV == 'prod'
      //   ? './google-services.json'
      //   : './google-services-test.json',
    },
    extra : {
      // eas: {
      //   projectId: 'd4123f97-6ca8-4128-8872-eac90755fd3d',
      // },
    },
  };
};

