export const generalConfig = {
  appVersionName: '1.10.26',
  appVersionCode: 113,
};

export const generalConfigStage = {
  appVersionName: '1.10.26',
  appVersionCode: 107,
};

const envConfig = {
  dev: {
    appName: 'Sparring DEV',
    slug: 'sparring-app',
    androidPackage: 'com.sparring.developer',
    bundleIdentifier: 'com.sparring.developer',
    extra: {
      envName: 'dev',
    },
  },


  //  Este es el que va al sparring beta nuevo 
  sparringBeta: {
    appName: 'Sparring',
    slug: 'sparring-app',
    androidPackage: 'com.sparring.sparring',
    bundleIdentifier: 'com.sparring.sparring',
    extra: {
      envName: 'sparring-beta',
    },
  },


  beta: {
    appName: 'Sparring',
    slug: 'sparring-app',
    androidPackage: 'com.testing.developer',
    bundleIdentifier: 'com.testing.developer',
    extra: {
      envName: 'beta',
    },
  },
};

const allowedEnvs = ['dev', 'beta', 'prod', 'sparring-beta', 'sparringBeta'];
const currentEnv = process.env.ENV || 'dev';
if (!allowedEnvs.includes(currentEnv)) {
  throw 'You must specify a valid environment key using the ENV environment variable';
}

const currentEnvConfig = envConfig[currentEnv];

const expoConfig = {
  name: currentEnvConfig.appName,
  slug: 'sparring-app',
  scheme: "sparring-app",
  privacy: 'public',
  platforms: ['ios', 'android', 'web'],
  version:
    currentEnv == 'beta'
      ? generalConfig.appVersionName
      : generalConfigStage.appVersionName,
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  icon:
    currentEnv == 'beta'
      ? './assets/icon.png'
      : './assets/icondev.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/77203b3b-264f-49bd-8e04-c3737db79889"
  },
  runtimeVersion: "1.0.4",
  assetBundlePatterns: ['**/*'],
  plugins: [
    [
      "expo-font",
      {
        "Thunder": "../assets/fonts/Thunder.ttf"
      }
    ],
    [
      "expo-image-picker",
      {
        photosPermission: "The app accesses your photos to let you share them with your friends."
      }
    ],
    [
      "expo-local-authentication",
      {
        faceIDPermission: "Allow Sparring to use Face ID."
      }
    ]
  ],
  hooks: {
  },
  ios: {
    supportsTablet: true,
    requireFullScreen: true,
    icon: currentEnv == 'beta'
      ? './assets/icon.png'
      : './assets/icondev.png',
    bundleIdentifier: currentEnvConfig.bundleIdentifier,
    buildNumber: '1', // Set build number manually
    config: {
      googleMapsApiKey: "AIzaSyBaSN2_IOj7PtMTMGro1BRc5qfL1NP_P0A"
    },
    infoPlist: {
      NSCameraUsageDescription: "Sparring necesita el permiso para que puedas acceder a la camara.",
      NSPhotoLibraryUsageDescription: "Sparring necesita el permiso a las fotos para que puedas cargar una foto para tu perfil.",
      NSLocationWhenInUseUsageDescription: "Sparring necesita el acceso para acceder a la localización",
      NSLocationAlwaysAndWhenInUseUsageDescription: "Sparring necesita el acceso para acceder a la localización",
      NSFaceIDUsageDescription: "Sparring quiere usar Face ID para ingresar",
      NSLocationAlwaysUsageDescription: "Sparring necesita el acceso para acceder a la localización",
      NSPhotoLibraryAddUsageDescription: "Sparring necesita el permiso para guardar una foto",
      UIBackgroundModes: [
        "location",
        "fetch"
      ]
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: 'com.sparring.developer', // development android package name
    versionCode: 1, // Set version code manually
    // googleServicesFile: './google-services.json',
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    ...currentEnvConfig.extra,
    "eas": {
      "projectId": "77203b3b-264f-49bd-8e04-c3737db79889"
    }
  }
};

export default ({ config }) => {
  return {
    ...config,
    ...expoConfig,
  };
};
