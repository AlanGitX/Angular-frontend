import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private ApiService:ApiServiceService){}


  categoryName: string=''
  productName: string=''
  productQuantity: number=0
  productPrice: number=0
  selectedProduct:any={}


  editedProduct: any; // Holds the edited values
  isEditMode: boolean = false;
  category_name:string=''
   product_name:string='' 
   product_quantity:number=0 
   product_price:number=0
   EditID:any


  data:any={};
  productList: any=[];

    ngOnInit() {
    this.loadProductList();
  }



  loadProductList() {
    this.ApiService.getProducts().subscribe((result:any)=>{
      console.log(result)
      this.productList = result
    })
 
  }


  addNewProduct() {
    this.ApiService.addProduct(this.data).subscribe((result:any)=>{
      console.log(result)
      this.loadProductList()

    })
  }

  editProduct(product: any) {
    console.log(product);
    

    this.isEditMode = true; 
    
    this.category_name = product.category_name;
    this.product_name =  product.product_name;
    this.product_price = product.product_price
    this.product_quantity = product.product_quantity
    this.EditID = product.id
    console.log( product.id)

  }

  deleteProduct(product:any){
    this.ApiService.deleteProduct(product.id).subscribe((result:any)=>{
      console.log(result);
      
    })

  }



  onSubmit(){
    this.data={
      category_name:this.categoryName,
      product_name:this.productName,
      product_quantity:this.productQuantity,
      product_price:this.productPrice
    }

    console.log('Category Name:', this.categoryName);
    console.log('Product Name:', this.productName);
    console.log('Product Quantity:', this.productQuantity);
    console.log('Product Price:', this.productPrice);
    console.log(this.data)

    this.addNewProduct()

  }


  saveChanges() {
    this.isEditMode = false;


    this.ApiService.editProduct({category_name:this.category_name, product_name:this.product_name, product_quantity:this.product_quantity, product_price:this.product_price, productId:this.EditID}).subscribe((result:any)=>{
      console.log(result)
      this.loadProductList()
    })
  }

  cancelEditMode() {
    this.isEditMode = false;
  }

}
