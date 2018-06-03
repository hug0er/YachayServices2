import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let apiURL = 'http://127.0.0.1:3000/api/v1/login/'
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }
  login(values) {
    return new Promise(resolve => {
      this.http.get(apiURL,{params:values}).subscribe(
        data=>{
          resolve(data)
  
          console.log(data);
        },err =>{
          console.log(err);
          if(!err.ok){
            console.log("error");
          }
        }
      )
    })
  
  }

}

