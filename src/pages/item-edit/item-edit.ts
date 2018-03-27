import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Parse } from 'parse';
/**
 * Generated class for the ItemEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-item-edit',
 	templateUrl: 'item-edit.html',
 })
 export class ItemEditPage {
   name;
   price;
   category;
   imgURL;
   description;
   id;

   constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
     this.name = navParams.get('item').name;
     this.price = navParams.get('item').price;
     this.category = navParams.get('item').category;
     this.imgURL = navParams.get('item').imgURL;
     this.description = navParams.get('item').description;
     this.id = navParams.get('item').id;
   }

   saveItem() {
     var Menu = Parse.Object.extend("Menu");
     var query = new Parse.Query(Menu);
     query.get(this.id).then((itemToEdit) => {
       itemToEdit.set("name", this.name);
       console.log(this.name);
       itemToEdit.set("price", Number.parseFloat(this.price));
       itemToEdit.set("category", this.category);
       itemToEdit.set("imgURL", this.imgURL);
       itemToEdit.set("description", this.description);
       itemToEdit.save();
     }, (error) => {

     });

     this.close();
   }

   close() {
     this.view.dismiss();
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad ItemEditPage');
   }

 }
