import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { CategoryService } from '../../providers/category-service-mock';
import { CartPage } from '../cart/cart';
import { AddproductPage} from '../addproduct/addproduct';
import { InformationPage} from '../information/information';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public numCat0 : number;
  public numCat1 : number;
  public numCat2 : number;
  public numCat3 : number;
  public numCat4 : number;
  id_user : any;
  proptype: string;
  constructor(public navCtrl: NavController,public categoryService: CategoryService,public navParams:NavParams) {
    this.id_user = {id_user :this.navParams.get('id_user')};
    console.log(this.id_user);
  }

  ionViewDidEnter(){
    this.categoryService.getNumCat()
    .subscribe(
      (data) => { // Success
        console.log(data);
        this.numCat0 = data[0].num_prod;
        this.numCat1 = data[1].num_prod;
        this.numCat2 = data[2].num_prod;
        this.numCat3 = data[3].num_prod;
        this.numCat4 = Number(this.numCat0)+Number(this.numCat1)+Number(this.numCat2)+Number(this.numCat3);
        
      },
      (error) =>{
        console.error(error);
      }
    )
  }
  openCartPage() {
    this.navCtrl.push(CartPage,this.id_user);
  }
  openAddProductPage() {
    this.navCtrl.push(AddproductPage,this.id_user);
  }
  openInformationPage() {
    this.navCtrl.push(InformationPage,this.id_user);
  }
  openCategoryPage(proptype) {
    proptype = proptype + 'Page';
  	this.navCtrl.push(proptype,this.id_user);
  }
}
