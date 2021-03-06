import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,
         AlertController, LoadingController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemEditPage } from '../item-edit/item-edit';
import { Parse } from 'parse';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-menu',
   templateUrl: 'menu.html',
 })
 export class MenuPage {

   items = [];

   constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public loadCtrl: LoadingController) {
   }

   addItem() {
     let addModal = this.modalCtrl.create(AddItemPage);

     addModal.onDidDismiss((item) => {

       if (item) {
         let loader = this.loadCtrl.create({
           content: 'Signing in...'
         });

         loader.present();
         this.saveItem(item);
         loader.dismiss();

         //this.ionViewDidEnter();
       }

     });     
     addModal.present();
   }

   saveItem(item) {
     var Menu = new Parse.Object.extend("Menu");
     var menu = new Menu();
     var base64 = item.productimage;
     var file = new Parse.File("photo.jpg", { base64: base64});

     file.save().then(function () {

     }, function(error) {

     });

     menu.set("name", item.name);
     menu.set("price", Number.parseFloat(item.price));
     menu.set("category", item.category);
     menu.set("imgURL", item.imgURL);
     menu.set("productimage", file);
     menu.set("description", item.description);

     menu.save(null, {
       success: function(menu) {
        // Execute any logic that should take place after the object is saved.
        //alert('New object created with objectID: ' + menu.id);
      },
      error: function(menu, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  editItem(item){
    this.navCtrl.push(ItemEditPage, {
      item: item
    });
  }

  delete(item) {
    let deleteAlert = this.alertCtrl.create({
      title: 'Remove From Menu?',
      subTitle: 'Are you sure you want to remove this from the menu?',
      buttons: [
      {
        text: 'Remove',
        handler: () => {
          var Menu = Parse.Object.extend("Menu");
          var query = new Parse.Query(Menu);
          query.get(item.id, {
            success: function(itemToDelete) {
              itemToDelete.destroy();
            },
            error: function(object, error) {
            }
          });
          this.ionViewDidEnter();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ionViewDidEnter() {
    this.items = [];
    var Menu = Parse.Object.extend("Menu");
    var query = new Parse.Query(Menu);
    query.find().then((menus) => {
      console.log(menus.length);

      for (var i = 0; i < menus.length; i++) {
        var photo = menus[i].get("productimage");
        var photoURL = photo.url();

        var menuItem = {
          name: menus[i].get("name"),
          price: menus[i].get("price"),
          category: menus[i].get("category"),
          imgURL: photoURL,
          description: menus[i].get("description"),
          id: menus[i].id
        }
        this.items.push(menuItem);
      }
    }, (error) => {
      console.log("error: "+error);
    });
  }

}
