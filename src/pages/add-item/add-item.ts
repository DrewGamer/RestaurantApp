import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {

  name;
  price;
  category;
  imgURL;
  description;

  constructor(public navCtrl: NavController, public view: ViewController) {

  }

  saveItem() {

    let newItem = {
      name: this.name,
      price: this.price,
      category: this.category,
      imgURL: this.imgURL,
      description: this.description
    };

    this.view.dismiss(newItem);

  }

  close() {
    this.view.dismiss();
  }

}