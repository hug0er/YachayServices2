import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController, AlertController, ToastController, MenuController, NavParams, LoadingController} from "ionic-angular";
import { CategoryService } from '../../providers/category-service-mock'
import moment from 'moment';
import {CategoryPage} from "../category/category";
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';



/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  image = null;
  myDate: String = moment().format();
  loading : any;
  id_user : number;
  numberSettings: any = {
      theme: 'ios',
      display: 'bottom',
      layout: 'fixed',
      step: 1,
      min: 10,
      max: 150,
      width: 150
  };
  todo:any = {}
  public onAddForm : FormGroup;

  constructor(private camera:Camera, private transfer: FileTransfer, private file: File,public storage: Storage,private loadingController: LoadingController, public categoryService: CategoryService, private _fb: FormBuilder, public nav: NavController, public navParams: NavParams, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,  public http: Http) {
    this.id_user = this.navParams.get('id_user');
    console.log(this.id_user);
    const fileTransfer: FileTransferObject = this.transfer.create();
  }
  fileTransfer: FileTransferObject = this.transfer.create();
  ngOnInit() {
    console.log(this.myDate);
    this.onAddForm = this._fb.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
      price: ['', Validators.compose([
        Validators.required
      ])],
      stock: [ , Validators.compose([
        Validators.required
      ])],
      delivery_date: ['', Validators.compose([
        Validators.required
      ])],
      start_date: ['', Validators.compose([
        Validators.required
      ])],
      category: ['', Validators.compose([
        Validators.required
      ])],
      id_user: [this.id_user]
    });
  }
 
  postProduct() {
    this.storage.get('token').then((val) => {
    this.categoryService.addproduct(val, this.onAddForm.value)
    .then((result) => {
      this.presentToastrc('Producto publicado correctamente');
      // this.nav.push(CategoryPage,{id_user: this.id_user});
    }, (err) =>{
          if (err.error.msg) this.presentToastrc(err.error.msg)
          else this.presentToastrc('Fallo al conectarse con el servidor')
         })
    })
      }

      takePhoto(){
        const options: CameraOptions = {
          quality: 90,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
        }     
        this.camera.getPicture(options).then((imageData) => {
          this.image = 'data:image/jpeg;base64,' + imageData;
         // imageData is either a base64 encoded string or a file URI
         // If it's base64:
         var options2: FileUploadOptions = {
          fileKey: 'file',
          chunkedMode: true,
          mimeType: 'image/jpeg',
          };
                console.log(this.image);
                this.fileTransfer.upload(this.image,'http://192.168.100.19:3000/api/product',options2).then((data) =>{
                  console.log('exito');
                  console.log(data);
              },(err) =>{
                console.log('error');
                console.log(err);
              })
        }, (err) => {
         console.log(err);
        });
      }
      
  presentToastrc(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
