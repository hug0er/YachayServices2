import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../providers/category-service-mock'
import { AlertController,LoadingController, ToastController } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

    loading: any;
    aumento: number;
    public carritoList : any;
    constructor( public storage: Storage, public toastCtrl: ToastController, private alertCtrl: AlertController, 
      private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams,
      public categoryService:CategoryService, private loadingController: LoadingController) {
    this.aumento = 0;
    }
    ionViewDidEnter() {
      console.log('ionViewDidLoad cart-Page');
      this.storage.get('token').then((val) => {
        this.categoryService.getCarrito(val)
      .then(
        (data) => {
          this.carritoList=data;
        },
        (err) =>{
        if (err.error.msg) this.presentToastrc2(err.error.msg)
        else this.presentToastrc2('Fallo al conectarse con el servidor')
        }
      )
      });
    }

    save(){
      this.storage.get('token').then((val) => {
        this.categoryService.updateCart(this.carritoList, val)
      .then(
        (data) => { this.presentToastrc2('Carrito Actualizado')},
        (err) =>{
        if (err.error.msg) this.presentToastrc2(err.error.msg)
        else this.presentToastrc2('Fallo al conectarse con el servidor')
        }
      )
      })
    }

    delete(i){
      this.storage.get('token').then((val) => {
        this.categoryService.deleteCart(this.carritoList[i]._id,val)
        .then(
          (data) => { 
            this.presentToastrc2('Producto eliminado')
            this.carritoList.splice(i,1)
          },
          (err) =>{
            if (err.error.msg) this.presentToastrc2(err.error.msg)
            else this.presentToastrc2('Fallo al conectarse con el servidor')
            }
        )
    })
  }

    presentPrompt() {
      let alert = this.alertCtrl.create({
        title: 'Direccion de Entrega',
        inputs: [
          {
            name: 'Dirección',
            placeholder: 'Dirección'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancelar',
            handler: data => {}
          },
          {
            text: 'Confirmar',
            handler: data => {
              this.storage.get('token').then((val) => {
                  this.categoryService.order(this.carritoList,data.Dirección, val)
                  .then(
                    (data : any) => { 
                      console.log(data);
                      if (data.offset){
                        this.showAlert(data.offset)
                      }else{
                        this.clear();
                        this.presentToastrc2('Haz realizado tu compra')
                      }
                    },
                    (err) =>{
                      if (err.error.msg) this.presentToastrc2(err.error.msg)
                      else if (err.error.offset) this.showAlert(err.error.offset)
                      else this.presentToastrc2('Fallo al conectarse con el servidor')
                    }
                  )
            })
          }
          }
        ]
      })
      alert.present();
    }

    presentToastrc2(m) {
      let toast = this.toastCtrl.create({
        message: m,
        duration: 2000
      });
      toast.present();
    }

    showAlert(str: string) {
        let alert = this.alertCtrl.create({
          subTitle: 'Los siguientes productos exceden el stock disponible: ',
          message: str,
          buttons: ['OK']
        });
        alert.present();
      }

    clear(){
      this.carritoList.splice(0,Object.keys(this.carritoList).length);
    }

    toTitleCase(string){
      if (string) return string.charAt(0).toUpperCase() + string.slice(1);
      return 'Nombre Genérico';
  }

    spliceDate(str :string){
      if (str) return str.substring(0,10);
      return 'Fecha genérica'
    }

    spliceDeliveryDate(str :string){
      if (str) return str.substring(0,10)+'   '+str.substring(11,16);
      return 'Fecha genérica'
    }
    add(i){
      this.carritoList[i].quantity= this.carritoList[i].quantity+ 1;
    }

    remove(i){
      if (this.carritoList[i].quantity- 1 < 1){
        this.carritoList[i].quantity= this.carritoList[i].quantity;
      }
      else{
        this.carritoList[i].quantity= this.carritoList[i].quantity - 1;
      }   
    }
}

  