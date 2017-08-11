import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase  from 'firebase';
import { Config } from './config'

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // intialize firebase with configration
      firebase.initializeApp(Config.Config);
      const unsbscribe = firebase.auth().onAuthStateChanged( user => {
        if (!user) {
          this.rootPage = 'login';
        } else {
          this.rootPage = HomePage;
        }
      } );
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


}

