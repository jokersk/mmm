import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Record } from './../../models/record.model';
import { FirebaseServerProvider } from './../../providers/firebase-server/firebase-server';
/**
 * Generated class for the AddRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-record',
  templateUrl: 'add-record.html',
})
export class AddRecordPage {

  record = {} as Record;

  constructor(private navCtrl: NavController, public navParams: NavParams, 
    private fbServer:FirebaseServerProvider, private afAuth:AngularFireAuth ) {
  }

  ionViewDidLoad() {
    this.record.uid = this.fbServer.getCurrentUser().uid;
  }

  addRecord(){
    
     this.fbServer.add(this.record).then( () => this.navCtrl.pop()) 
  }
   

}
