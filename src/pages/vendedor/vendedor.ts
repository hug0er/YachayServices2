import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { AddproductPage } from '../addproduct/addproduct';
import { InformationPage } from '../information/information';
import { CategoryService } from '../../providers/category-service-mock'
/**
 * Generated class for the VendedorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendedor',
  templateUrl: 'vendedor.html',
})
export class VendedorPage {
  public ventaList : any;
  id_user : number;
  constructor(public toastCtrl : ToastController,public navCtrl: NavController, public navParams: NavParams,public categoryService:CategoryService) {
    this.id_user = this.navParams.get('id_user');
    console.log(this.id_user.toString());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendedorPage');
    this.categoryService.getVendedorProducts(this.id_user.toString())
    .then(
      (data) => { // Success
        this.ventaList=data;
        console.log(this.ventaList);
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  toTitleCase(str :string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  spliceDate(str :string){
    return str.substring(0,10);
  }

  spliceDeliveryDate(str :string){
    return str.substring(0,10)+'   '+str.substring(11,16);
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

  openListaPage(id_product :number){
    this.navCtrl.push('ListaPage',{id_user : this.id_user, id_product : id_product});
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
