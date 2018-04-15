import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth  } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  account = {"email":"","password":""};

  constructor(private afAuth : AngularFireAuth, public navCtrl: NavController, private toast : ToastController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async  register(){
    try{
      const result  = await 
      this.afAuth.auth.createUserWithEmailAndPassword(this.account.email, this.account.password);
      this.toast.create({
        message:'Account successfully created.',
        duration:3000
      }).present()
      console.log(result);
    }
    catch(e){
      console.log(e.message);
      this.toast.create({
        message:e.message,
        duration:3000
      }).present()
    }
    
  }

}
