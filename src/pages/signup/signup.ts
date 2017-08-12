import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';


/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
    name: 'signup'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertControl: AlertController,
              public loadingController: LoadingController,
              public authProvider: AuthProvider,
              public formBuilder: FormBuilder
              ) 
  {
    this.signupForm = formBuilder.group(
     {
       email: ['' , Validators.compose([Validators.required,EmailValidator.isValid])],
       password: ['',Validators.compose([Validators.required,Validators.minLength(6)])]
     });

  }

  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email,this.signupForm.value.password).then( () => {
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }, (error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertControl.create({
          message: error.message,
          buttons: [{
            text: "Ok",
            role: "cancel"
          }]
        });
        alert.present();
      }); 
    });
    this.loading = this.loadingController.create();
    this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
