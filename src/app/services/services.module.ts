import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './products/product.service';

@NgModule({
  declarations: [
  ],
  providers: [
    ProductService
  ], 
  imports: [
    CommonModule
  ]
})
export class ServicesModule { }
