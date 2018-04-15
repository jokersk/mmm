import { Record } from './../../models/record.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServerProvider } from '../../providers/firebase-server/firebase-server';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  
  recordList$ :  Observable<Record[]>;
  finalData : any = [];
  total : number = 0;
  currentUser : any;
  constructor(private fb:FirebaseServerProvider, 
    private navCtrl: NavController, private navParams: NavParams) {
  }
  

  ionViewDidLoad() {
    this.currentUser = this.fb.getCurrentUser();
    this.fb.list()
    .snapshotChanges()
    .map(
      change =>{
        return change.map(c=>({
           key: c.payload.key, 
           ...c.payload.val()
        }))
      }
    )
    .subscribe(res=>{
      this.total = 0;
      res.filter(r => r.uid == this.currentUser.uid)
      .forEach(r => {
        this.total += Number(r.price)
        if(this.finalData.find( value => value.date == r.date ) === undefined)
        {
          this.finalData.push({ 'date':r.date, 'price': Number(r.price) }) 
        }else{
          let temp = this.finalData.find( value => value.date == r.date )
          temp.price += Number(r.price)
        }

        this.finalData.map(data=>{
          if(data.price <= 80) data.color = "cool"
          else if(data.price <= 150) data.color = "ok"
          else if(data.price <= 200) data.color = "acceptable"
          else if(data.price <= 300) data.color = "toomuch"
          else data.color = "danger"
        })
        
      })
     
      
    })

    
  }




}
