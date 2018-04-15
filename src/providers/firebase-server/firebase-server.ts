import { AngularFireAuth } from 'angularfire2/auth';
import { Record } from './../../models/record.model';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the FirebaseServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServerProvider {
  
  currentUser : any;

  constructor( private db:AngularFireDatabase, private afAuth: AngularFireAuth ) {
    var auth = this.afAuth.authState.subscribe( (user) => {
      
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  getCurrentUser(){
    return this.currentUser;
  }

    
  private recordListRef = this.db.list<Record>("record-list");
  
  add(record:Record){
    return this.recordListRef.push(record);
  }

  update(key,obj)
  {
    this.db.object('/record-list/'+key)
    .update(obj);
  }


  list(date?:string){
    if(date)
    {
      return this.db.list<Record>("/record-list", ref => ref.orderByChild('date').equalTo(date) )
    }
    else
    return this.recordListRef
  }
  

  remove(key:string){
    return this.recordListRef.remove(key);
  }

}
