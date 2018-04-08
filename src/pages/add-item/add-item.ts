import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})

export class AddItemPage {
  name;
  price;
  category;
  imgURL;
  productimage;
  description;

  imagePreview;

  constructor(public navCtrl: NavController, public view: ViewController, private camera: Camera) {
    this.imagePreview = "http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png";
  }

  saveItem() {

    let newItem = {
      name: this.name,
      price: this.price,
      category: this.category,
      imgURL: this.imgURL,
      productimage: this.productimage,
      description: this.description
    };

    this.view.dismiss(newItem);

  }

  takePhoto() {
    const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

    this.camera.getPicture(options).then((imageData) => {
      this.productimage = imageData;
    }, (err) => {
      // Handle error
    });

    this.imagePreview = this.productimage;
    this.ionViewWillEnter();
  }

  close() {
    this.view.dismiss();
  }

  ionViewWillEnter() {

  }

}