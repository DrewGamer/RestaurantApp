import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Parse } from 'parse';

// Providers
import { Data } from '../../providers/data';

// Pages
//import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  password: string = '';
  username: string = '';
  verify: string = '';
  email: string = '';

  constructor(public navCtrl: NavController, private data: Data, private loadCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('Initiate Signup');
  }

  // TODO: form validation
  public doRegister() {
    let loader = this.loadCtrl.create({
      content: 'Signing up...',

    });
    loader.present();

    var user = new Parse.User();
    user.set("username", this.username);
    user.set("password", this.password);
    user.set("email", this.email);
    // other fields can be set just like with Parse.Object
    user.set("phone", "415-392-0202");

    let isSignedUp = false;

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        loader.dismissAll();
        alert("Signup Complete!");
        isSignedUp = true;
        console.log("WE GUCCI")
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
        loader.dismissAll();
      }
    });

    if (isSignedUp)
      this.navCtrl.pop();
  }

    /*
    this.authPvdr.signup(this.username, this.password, this.email).subscribe((success) => {
      this.navCtrl.setRoot(SignupPage);
      loader.dismissAll();
    }, (error) => {
      loader.dismissAll();
    });
    */

    

}
