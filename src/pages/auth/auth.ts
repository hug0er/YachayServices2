import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { Http} from '@angular/http';
import {CategoryPage} from "../category/category";
import {AuthProvider} from '../../providers/auth/auth';
import { CategoryService } from '../../providers/category-service-mock'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage implements OnInit {
  local: Storage;
  auth: string = "login"
  public onLoginForm: FormGroup;
  public onRegisterForm: FormGroup;
  todo:any = {};

  constructor(public storage: Storage, public categoryService:CategoryService, public authprovider: AuthProvider, private _fb: FormBuilder, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,  public http: Http) {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.onRegisterForm = this._fb.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      lastname: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      cellphone: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  login() {
    this.categoryService.login(this.onLoginForm.value).then((result : any) => {
      this.storage.set("token", result.token);
      this.nav.setRoot(CategoryPage);
    }, (err) => {
      if (err.error.msg) this.presentToastrc2(err.error.msg)
      else this.presentToastrc2('Fallo al conectarse con el servidor')
        })    
  }

  register() {
    this.categoryService.register(this.onRegisterForm.value).then((result) => {
      this.presentToastrc2('Registrado Correctamente');
    }, (err) => {
      if (err.error.msg) this.presentToastrc2(err.error.msg)
      else this.presentToastrc2('Fallo al conectarse con el servidor')
        })
  }

  presentToastrc2(m) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }
}
