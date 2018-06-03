import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AddproductService {

  constructor(
    private http: HttpClient
  ) {}

  postProduct(pproduct) {
    return this.http.post('http://127.0.0.1:3000/api/v1/todos',pproduct);
  }
}
