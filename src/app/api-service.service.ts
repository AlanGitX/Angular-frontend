import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  getProducts = () =>{
    return this.http.get('http://localhost:3000/products')
  }

  addProduct = (data:any) =>{
    console.log(data);
    
    return this.http.post('http://localhost:3000/products/add',data)
  }

  deleteProduct=(data:any)=>{
    return this.http.delete('http://localhost:3000/delete/' + data)
  }

  editProduct =(data:any)=>{
    return this.http.put('http://localhost:3000/edit/' + data.productId,data)

  }
}
