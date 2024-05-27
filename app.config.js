export default ({ config }) => {
  return {
    ...config,
    plugins: [
      'expo-font',
    ],
    hooks: {
    },
    "updates": {
      fallbackToCacheTimeout: 0,
      "url": "https://u.expo.dev/77203b3b-264f-49bd-8e04-c3737db79889"
    },
    "runtimeVersion": "1.0.1",
    // name: process.env.NODE_ENV == 'prod' ? 'UGo!' : 'UGo! Test',
    name: 'Sparring Dev',
    ios: {
      ...config.ios,
      bundleIdentifier:
        'com.sparring.developer', // development ios bundle identifier
        // 'com.testing.developer',

      // googleServicesFile: './GoogleService-Info.plist',
    },
    version: '1.10.21',
    
    "extra": {
      "eas": {
        "projectId": "77203b3b-264f-49bd-8e04-c3737db79889"
      }
    }
  };
};

