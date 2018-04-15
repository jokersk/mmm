

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HistoryPage } from './../pages/history/history';
import { LoginPage } from './../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddRecordPage } from '../pages/add-record/add-record';
import { AngularFireModule } from 'angularfire2' ;
import { AngularFireAuthModule } from 'angularfire2/auth';
import {  AngularFireDatabaseModule} from "angularfire2/database";
import { FIREBASE_CONFIG } from './firebase.config';
import { FirebaseServerProvider } from '../providers/firebase-server/firebase-server';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddRecordPage,
    HistoryPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddRecordPage,
    HistoryPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServerProvider
  ]
})
export class AppModule {}
