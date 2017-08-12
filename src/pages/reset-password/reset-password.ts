import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


/**
 * Generated class for the ResetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
    name: 'reset-password'
})
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;
  public loading: Loading;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public authProvider: AuthProvider,
              public alertCtrl: AlertController
  ) 
  {
    this.resetPasswordForm = formBuilder.group({
      email: ['',Validators.compose([Validators.email,Validators.required])]
    });
  }

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    } else {
    this.authProvider.resetPassword(this.resetPasswordForm.value.email)
    .then( (user) =>{
        let alert = this.alertCtrl.create({
          message: "instruction sent to your email",
          buttons:[{
            text: "Ok",
            role: "cancel",
            handler: ()=> {this.navCtrl.pop();}
          }]
        });
        alert.present();
      }, error => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [{text: "Ok", role: "cancel"}]
        });
        errorAlert.present();
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
