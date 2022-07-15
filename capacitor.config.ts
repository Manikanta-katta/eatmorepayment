import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eatmore.aPP',
  appName: 'Eatmore',
  webDir: 'build',
  bundledWebRuntime: false,
  // server:{
  //    url:'http://172.17.7.118:8100',
  //    cleartext: true
  //    },
  plugins: {

    SplashScreen: {

        launchShowDuration : 1000

    }

  }
};

export default config;
