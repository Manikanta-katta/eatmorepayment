import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eatmore.aPP',
  appName: 'Eatmore',
  webDir: 'build',
  bundledWebRuntime: false,

  plugins: {

    SplashScreen: {

        launchShowDuration : 1000

    }

  }
};

export default config;
