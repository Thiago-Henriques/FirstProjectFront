import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product.models';  
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  products: Product[] = [];

  constructor(private apiService: ProductService) { }

  ngOnInit(): void {
    console.log('ProductComponent initialized');
    this.apiService.get().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        console.log('products', this.products);
      },
      error: (error) => {
        console.error('Error fetching product data', error);
      }
    });
  }
}
