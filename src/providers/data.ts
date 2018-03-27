import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Parse } from 'parse';

 
@Injectable()
export class Data {
  private parseAppId: string = "KA9fI2Lzbg1yUXlVI9ALjhlNzbHIuzEnKjNCDAfl";
  private parseJSKey: string = "R4l0wbdRdT0MYTByx1tUcZ1lzge3i0QLKK6JGsJK";
  private parseServerURL: string = "https://parseapi.back4app.com/";

  public newitemcreated=false;

  constructor(public storage: Storage){
    Parse.initialize(this.parseAppId, this.parseJSKey);
    Parse.serverURL = this.parseServerURL;
    
    console.log('Initiated Parse');

    const Menu = Parse.Object.extend('Menu');
    let query = new Parse.Query(Menu);
    query.limit(1000);
    query.find().then((menus) => {
      console.log(menus.length)
    }, (error) => {
      console.log(error);
      //reject(error);
    });
 
  }
 
  getData() {
    return this.storage.get('todos');  
  }

  getOrder() {
  	return this.storage.get('myOrder');
  }
 
  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('todos', newData);
  }

  saveOrder(data) {
  	let newData = JSON.stringify(data);
  	this.storage.set('myOrder', newData);
  }
 
}