import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { AddproductPage } from '../addproduct/addproduct';
import { InformationPage } from '../information/information';
import { CategoryService } from '../../providers/category-service-mock';

/**
 * Generated class for the OcioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocio',
  templateUrl: 'ocio.html',
})
export class OcioPage {
  public ocioList : any;
  id_user : number;
  constructor(public toastCtrl : ToastController,public categoryService : CategoryService,public navCtrl: NavController, public navParams: NavParams) {
    this.id_user = this.navParams.get('id_user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcioPage');
    this.categoryService.getCategoryProducts("2")
    .then(
      (data) => { // Success
        this.ocioList=data;
        console.log(this.ocioList);
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  gotoCart(id_product:number){
    this.categoryService.sendCart(this.id_user,id_product)
    .then(
      (data)=>{
        this.presentToastExito();
        console.log(data);
      },
      (error) =>{
        this.presentToastFallido();
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
