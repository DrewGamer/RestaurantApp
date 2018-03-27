import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Parse } from 'parse';

// Providers
import { Data } from '../../providers/data';

// Pages
import { SignupPage } from '../signup/signup';
//import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  registerPage = SignupPage;
  password: string = '';
  username: string = '';

  constructor(public navCtrl: NavController, private loadCtrl: LoadingController, private data:Data ) { }

  ionViewDidLoad() {
    console.log('Initiated Signin');
  }

  public doSignin() {
    let loader = this.loadCtrl.create({
      content: 'Signing in...'
    });
    loader.present();
    var self=this;
    Parse.User.logIn(this.username, this.password, {
      success: function(user) {
        //do stuff after successful login
        loader.dismiss();
      },
      error: function(user, error) {
        //something bad happened
        alert("No user found");
        loader.dismiss();
      }
    });

    
/*
    this.authPvdr.signin(this.username, this.password).subscribe((success) => {
      this.navCtrl.setRoot(SignupPage);
      loader.dismissAll();
    }, (error) => {
      alert('Invalid username or password');
      loader.dismissAll();
    });
  */
  }
}
