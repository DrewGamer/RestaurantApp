import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Parse } from 'parse';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-item-detail',
   templateUrl: 'item-detail.html',
 })
 export class ItemDetailPage {
   orderItem:any;
   quantity = 1;
   date = new Date().toDateString();

   constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
     this.orderItem = navParams.get('item');
   }

   addToMyOrder() {
     var Order = Parse.Object.extend("Order");
     var Menu = Parse.Object.extend("Menu");
     var order = new Order();
     var pointer = Menu.createWithoutData(this.orderItem.id);
     var date = new Date(this.date);

     order.set("itemName", this.orderItem.name);
     order.set("customer", Parse.User.current());
     order.set("menuItem", pointer);
     order.set("itemQuantity", this.quantity);
     order.set("totalPrice", this.orderItem.price * this.quantity);
     order.set("deliveryTime", date);

     order.save().then((order) => {
       alert("Item added to order.");
       this.view.dismiss();
     }, (error) => {
       alert("Item could not be added to your order: " + error);
     });
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad ItemDetailPage');
   }

 }
