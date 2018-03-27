import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { MenuPage } from '../menu/menu';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  menuPage: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {
    this.menuPage = MenuPage;

    this.dataService.getData().then((todos) => {

      if (todos) {
        this.items = JSON.parse(todos);
      }

    });

  }

  ionViewDidLoad() {

  }

  addItem() {

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if (item) {
        this.saveItem(item);
      }

    });

    addModal.present();

  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  deleteData() {
    this.dataService.storage.clear();
  }

}