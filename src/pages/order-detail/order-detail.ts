import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Parse } from 'parse';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-order-detail',
   templateUrl: 'order-detail.html',
 })
 export class OrderDetailPage {
   itemID;
   name;
   price;
   category;
   imgURL;
   description;


   constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
     this.itemID = navParams.get('item').id;
     this.name = "bob";
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad OrderDetailPage');

     var Menu = Parse.Object.extend("Menu");
     var query = new Parse.Query(Menu);
     console.log(this.itemID);
     query.get(this.itemID).then((item) => {
          this.name = item.get("name");
          this.price = item.get("price");
          this.category = item.get("category");
          this.imgURL = item.get("imgURL");
          this.description = item.get("description");
     }, (error) => {
      console.log("error: "+error);
     });
   }

 }
