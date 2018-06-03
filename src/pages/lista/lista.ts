import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { AddproductPage } from '../addproduct/addproduct';
import { InformationPage } from '../information/information';
import { CategoryService } from '../../providers/category-service-mock'

/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  public entregaList : any;
  id_user : number;
  id_product : number;
  name : string = "";
  constructor(public toastCtrl : ToastController,public navCtrl: NavController, public navParams: NavParams,public categoryService:CategoryService) {
    this.id_user = this.navParams.get('id_user');
    this.id_product = this.navParams.get('id_product');
    console.log(this.id_product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
    this.categoryService.getListaVendedorProducts(this.id_user.toString(),this.id_product.toString())
    .then(
      (data) => { // Success
        this.entregaList=data;
        this.name = this.entregaList[0].comida;
      },
      (error) =>{
        console.error(error);
      }
    )
  }
  toTitleCase(str :string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  openCartPage() {
    this.navCtrl.push(CartPage,{id_user:this.id_user});
  }
  openAddProductPage() {
    this.navCtrl.push(AddproductPage,{id_user:this.id_user});
  }
  openInformationPage() {
    this.navCtrl.push(InformationPage);
  }


  presentToastExito() {
    let toast = this.toastCtrl.create({
      message: 'Exito',
      duration: 3000
    });
    toast.present();
  }
  presentToastFallido() {
    let toast = this.toastCtrl.create({
      message: 'Fail',
      duration: 3000
    });
    toast.present();
  }

}
