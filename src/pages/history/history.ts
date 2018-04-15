import { Record } from './../../models/record.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServerProvider } from '../../providers/firebase-server/firebase-server';



@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  date : string;
  records : Record[];
  total:number = 0;
  constructor(private fb:FirebaseServerProvider,  public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    
  }

  selectDate(){
    this.fb.list(this.date).valueChanges()
    .subscribe(
      res => {
        this.total = 0;
        res.map(r=>{
          this.total += Number(r.price)
        })
        this.records = res;
      }
    )
  
    
  }

}
