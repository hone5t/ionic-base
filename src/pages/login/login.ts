import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
    name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loading: Loading;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProivder: AuthProvider
  ) {
    this.loginForm = formBuilder.group({
      email:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])]
    })
  }
  loginUser(): void{
    if (!this.loginForm.valid) {
      console.log(this.loginForm);
    } else {
      this.authProivder.loginUser(this.loginForm.value.email,this.loginForm.value.password)
      .then( user => {
        this.loading.dismiss().then( () =>{
          this.navCtrl.setRoot(HomePage);
        });
      },error => {
        this.loading.dismiss().then( ()=> {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons : [{
            text: 'Ok',
            role: 'cancel'
            }]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  goToSignup() {
    this.navCtrl.push('signup');
  }
  goToResetpassword() {
    this.navCtrl.push('reset-password');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
