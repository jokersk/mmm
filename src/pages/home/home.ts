import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddRecordPage } from '../add-record/add-record';
import { FirebaseServerProvider } from '../../providers/firebase-server/firebase-server';
import { Observable } from 'rxjs/Observable';
import { Record } from './../../models/record.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser : any;
  recordList$ : any;
  total : number = 0; 
  today = new Date().toISOString().slice(0, 10);
  constructor( private fbServer : FirebaseServerProvider, 
    private afAuth : AngularFireAuth,
    public navCtrl: NavController) {
    this.getTodayData().then( (user) => {
      
       this.fbServer.list(this.today)
      .snapshotChanges()
      .map(
        change =>{
          return change
          .filter(c => {
            return c.payload.val().uid == this.currentUser.uid
          })
          .map(c=>({
             key: c.payload.key, 
             ...c.payload.val()
          }))
        }
      ).subscribe(result=>{
        this.recordList$ = result
        this.total = 0;
        result.forEach(r=>{
          this.total += Number(r.price)
        })
      })
      
    } )
  
    
  }

 

  async getTodayData(){
      await this.afAuth.authState.subscribe(user=>{
        this.currentUser = user
      })
  }

  ionViewDidLoad(){
    
    // this.fbServer.list(this.today)
    // .valueChanges()
    // .subscribe( res => {
    //   this.total = 0;
    //   res.map(r => {
    //     this.total += Number(r.price)
    //   })
    // })
  }
  
  recordRemove(key:string){
    this.fbServer.remove(key)
  }


  navToAdd(){
    this.navCtrl.push(AddRecordPage);
  }
}
