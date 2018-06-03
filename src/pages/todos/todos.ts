import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { AddproductPage } from '../addproduct/addproduct';
import { InformationPage } from '../information/information';
import { CategoryService } from '../../providers/category-service-mock'

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {
  public todoList : any;
  id_user : number;
  constructor(public toastCtrl : ToastController,public navCtrl: NavController, public navParams: NavParams,public categoryService:CategoryService) {
    this.id_user = this.navParams.get('id_user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodosPage');
    this.categoryService.getAllProducts()
    .then(
      (data) => { // Success
        this.todoList=data;
        console.log(this.todoList);
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
