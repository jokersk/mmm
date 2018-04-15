import { HomePage } from './../home/home';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireAuth } from 'angularfire2/auth';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account = {"email":"","password":""};

  constructor(
    private toast : ToastController, 
    private afAuth:AngularFireAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    
  }

  ionViewDidLoad() {
    var auth = this.afAuth.authState.subscribe( (user) => {
      if (user) {
        this.navCtrl.setRoot(HomePage)
      } else {
        console.log("no user")
      }
    });
  }

  navigateToPage(page:string){
    this.navCtrl.push(page)
  }

  async login(){
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.account.email,this.account.password);
      
      this.toast.create({
        message : `Welcome ${result.email}`,
        duration : 3000
      }).present()
      this.navCtrl.setRoot(HomePage)
    }catch(e){
      this.toast.create({
        message : e.message,
        duration : 3000
      }).present()
    }
  }

}
