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
import { HttpHeaders  } from '@angular/common/http';



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
  token : String;
  // header : HttpHeaders;
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
    this.storage.get('token').then((val) => {
      // let header = new HttpHeaders;
      // header = header.append('Content-Type','application/json');
      // header = header.append('Accept','application/json');
      // header = header.append('Authorization','Bearer ' + val);
            // this.header = header
      this.token = val;
      const fileTransfer: FileTransferObject = this.transfer.create();
    },(err) =>{
      this.presentToastrc('Error con autentificación')
    })
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
    var options2: FileUploadOptions = {
      fileKey: 'file',
      chunkedMode: true,
      mimeType: 'image/jpeg',
      headers: {'Authorization': 'Bearer ' + this.token}, 
      params: this.onAddForm.value
      }
      this.fileTransfer.upload(this.image,'http://192.168.100.19:3000/api/product',options2).then((data) =>{
        this.presentToastrc('Producto Creado')
        },(err) =>{
            this.presentToastrc('Error al subir el Producto')
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

        }, (err) => {
          this.presentToastrc('Error al tomar la fotografía')
        })
      }
      
  presentToastrc(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
