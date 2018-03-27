import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Parse } from 'parse';
import { OrderDetailPage } from '../order-detail/order-detail';

/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-my-order',
 	templateUrl: 'my-order.html',
 })
 export class MyOrderPage {
 	public items = [];

 	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public view: ViewController) {
 	}

 	removeItemFromOrder(item){
 		let deleteAlert = this.alertCtrl.create({
 			title: 'Remove From Order?',
 			subTitle: 'Are you sure you want to remove this from the order?',
 			buttons: [
 			{
 				text: 'Remove',
 				handler: () => {
 					var Order = Parse.Object.extend("Order");
 					var query = new Parse.Query(Order);
 					query.get(item.id, {
 						success: function(itemToDelete) {
 							itemToDelete.destroy();
 						},
 						error: function(object, error) {
 						}
 					});
 					this.ionViewWillEnter();
 				}
 			},
 			{
 				text: 'Keep',
 				role: 'cancel'
 			}
 			]
 		});
 		deleteAlert.present();
 	}

 	viewItem(item) {
 		this.navCtrl.push(OrderDetailPage, {
 			item: item.menuItem
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad MyOrderPage');
 	}

 	ionViewWillEnter(){
 		this.items = [];
 		var Order = Parse.Object.extend("Order");
 		var Menu = Parse.Object.extend("Menu");
 		var queryOrder = new Parse.Query(Order);
 		var queryMenu = new Parse.Query(Menu);
 		queryOrder.equalTo("customer", Parse.User.current());
 		queryOrder.find().then((orders) => {
 			for (var i = 0; i < orders.length; i++) {
 				var orderItem = {
 					name: orders[i].get("itemName"),
 					quantity: orders[i].get("itemQuantity"),
 					totalPrice: orders[i].get("totalPrice"),
 					deliveryTime: orders[i].get("deliveryTime"),
 					menuItem: orders[i].get("menuItem"),
 					id: orders[i].id
 				}
 				this.items.push(orderItem);
 			}
 		}, (error) => {
 			console.log("error: " + error);
 		});
 	}
 }
