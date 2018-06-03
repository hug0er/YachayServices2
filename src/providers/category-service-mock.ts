import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AlertController,LoadingController } from 'ionic-angular';
let url = 'http://192.168.100.19:3000'

@Injectable()
export class CategoryService {
  loading: any;
  duration : number;
  constructor(
    private http: HttpClient,
    public alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {}

  getNumCat() {
    return this.http.get(url+'/api/v1/num_products');
  }

  getCarrito(token){
    let header = new HttpHeaders;
    header = header.append('Content-Type','application/json');
    header = header.append('Accept','application/json');
    header = header.append('Authorization','Bearer ' + token);
    this.loading= this.loadingController.create({
      content : 'Conectando..',
    });
      this.loading.present();
    return new Promise((resolve, reject) => {
      this.http.get(url + '/api/cart', {headers: header}).subscribe(
        data=>{
          resolve(data)
          this.loading.dismiss();
        },err =>{
          reject(err) 
          this.loading.dismiss()
        }
      )
    })
  }
  sendCart(id_user: number,id_product : number){
    this.loading= this.loadingController.create({
      content : 'Cargando..'
      //duration : 3000
    });
      this.loading.present();
      return new Promise(resolve => {
        this.http.post(url+'/api/v1/send_carrito',{id_user:id_user,id_product:id_product}).subscribe(
          data=>{
            resolve(data)
            this.loading.dismiss()
            console.log(data);
          },err =>{
            console.log(err);
            if(!err.ok){
              this.loading.dismiss();
              this.showAlert();
            }
          }
        )
      })
  }

  getCategoryProducts(id_category : string){
    this.loading= this.loadingController.create({
      content : 'Cargando..'
      //duration : 3000
    });
      this.loading.present();
      return new Promise(resolve => {
        this.http.get(url + '/api/v1/category/'+id_category).subscribe(
          data=>{
            resolve(data)
            this.loading.dismiss()
          },err =>{
            console.log(err);
            if(!err.ok){
              this.loading.dismiss();
              this.showAlert();
            }
          }
        )
      })
  }

  getAllProducts(){
    this.loading= this.loadingController.create({
      content : 'Cargando..'
      //duration : 3000
    });
      this.loading.present();
      return new Promise(resolve => {
        this.http.get(url + '/api/v1/todo').subscribe(
          data=>{
            resolve(data)
            this.loading.dismiss();
          },err =>{
            console.log(err);
            if(!err.ok){
              this.loading.dismiss();
              this.showAlert();
            }
          }
        )
      })
  }

  getVendedorProducts(id_user : string){
    this.loading= this.loadingController.create({
      content : 'Cargando..'
      //duration : 3000
    });
      this.loading.present();
      return new Promise(resolve => {
        this.http.get(url + '/api/v1/vendedor/'+id_user).subscribe(
          data=>{
            resolve(data)
            this.loading.dismiss()
          },err =>{
            console.log(err);
            if(!err.ok){
              this.loading.dismiss();
              this.showAlert();
            }
          }
        )
      })
  }

  getListaVendedorProducts(id_user : string,id_prod : string){
    this.loading= this.loadingController.create({
      content : 'Cargando..'
      //duration : 3000
    });
      this.loading.present();
      return new Promise(resolve => {
        this.http.get(url + '/api/v1/vendedor/lista/'+id_user+'/'+id_prod).subscribe(
          data=>{
            resolve(data)
            this.loading.dismiss()
          },err =>{
            console.log(err);
            if(!err.ok){
              this.loading.dismiss();
              this.showAlert();
            }
          }
        )
      })
  }

  updateCart(val, token){
    let header = new HttpHeaders;
    header = header.append('Content-Type','application/json');
    header = header.append('Accept','application/json');
    header = header.append('Authorization','Bearer ' + token);
    this.loading= this.loadingController.create({
      content : 'Conectando..',
    });
      this.loading.present();
    return new Promise((resolve, reject) => {
      this.http.post(url + '/api/cart/update', val, {headers: header}).subscribe(
        data=>{
          resolve(data)
          this.loading.dismiss();
        },err =>{
          reject(err) 
          this.loading.dismiss()
        }
      )
    })
  }

deleteCart(result, token){
  let header = new HttpHeaders;
    header = header.append('Content-Type','application/json');
    header = header.append('Accept','application/json');
    header = header.append('Authorization','Bearer ' + token);
  this.loading= this.loadingController.create({
    content : 'Cargando..'
  });
    this.loading.present();
  return new Promise((resolve, reject) => {
    this.http.delete(url + `/api/Cart/${result}`, {headers: header}).subscribe(
      data=>{
        resolve(data);
        this.loading.dismiss();
      },err =>{
        reject(err) 
        this.loading.dismiss()
      }
    )
  })
}

order(result, direction,token){
  let header = new HttpHeaders;
    header = header.append('Content-Type','application/json');
    header = header.append('Accept','application/json');
    header = header.append('Authorization','Bearer ' + token);
  this.loading= this.loadingController.create({
    content : 'Cargando..'
  });
    this.loading.present();
  return new Promise((resolve, reject) => {
    this.http.post(url + '/api/cartOrder/'+direction,result,{headers: header} ).subscribe(
      data=>{
        resolve(data)
        this.loading.dismiss();
      },err =>{
        reject(err) 
        this.loading.dismiss()
      }
    )
  })
}
register(result){
  this.loading= this.loadingController.create({
    content : 'Verificando..',
  });
    this.loading.present();
  return new Promise((resolve, reject) => {
    this.http.post(url + '/api/signUp',result).subscribe(
      data=>{
        resolve(data)
        this.loading.dismiss();
      },err =>{
        reject(err) 
        this.loading.dismiss()
      }
    )
  })
}

addproduct(token, result){
  let header = new HttpHeaders;
    header = header.append('Content-Type','application/json');
    header = header.append('Accept','application/json');
    header = header.append('Authorization','Bearer ' + token);
  this.loading= this.loadingController.create({
    content : 'Publicando..',
  });
    this.loading.present();
  return new Promise((resolve,reject) => {
    this.http.post(url + '/api/product',result,{headers: header}).subscribe(
      data=>{
        resolve(data)
        this.loading.dismiss();
      },err =>{
        reject(err) 
        this.loading.dismiss()
      }
    )
  })
}

login(values) {
  this.loading= this.loadingController.create({
    content : 'Verificando..',
  });
    this.loading.present();
  return new Promise((resolve, reject) => {
    this.http.post(url+'/api/signIn',values).subscribe(
      data=>{
        resolve(data)
        this.loading.dismiss()
      },err =>{
        reject(err) 
        this.loading.dismiss()
      }
    )
  })

}
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Fallo al conectar con el servidor',
      subTitle: 'Revisa tu coneccion a internet',
      buttons: ['OK']
    });
    alert.present();
  }
}