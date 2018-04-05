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
  photo;
  description;

  constructor(public navCtrl: NavController, public view: ViewController, private camera: Camera) {

  }

  saveItem() {

    let newItem = {
      name: this.name,
      price: this.price,
      category: this.category,
      imgURL: this.imgURL,
      photo: this.photo,
      description: this.description
    };

    this.view.dismiss(newItem);

  }

  takePhoto() {
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
    console.log("WE TOOK THE PICTURE!!!");

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  close() {
    this.view.dismiss();
  }

}