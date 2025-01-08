import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product.models';  
import { ProductService } from '../../services/products/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../shared/message-modal/message-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'edit'];
  dataSource = new MatTableDataSource<Product>();
  isError: boolean = false;

  constructor(private apiService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.apiService.get().subscribe({
      next: (data: Product[]) => {
        if (data && data.length) {
          this.products = data;
          this.dataSource.data = this.products;
        } else {
          this.isError = true;
        }
      },
      error: (error) => {
        console.error('Error fetching product data:', error);
        this.isError = true;
        this.openDialog('Error', 'Error fetching products.', 'error');
      }
    });
  }

  editProduct(product: Product) {
    this.apiService.put(product).subscribe({
      next: () => {
        this.openDialog('Success', 'Product updated successfully!', 'success');
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.openDialog('Error', 'Error updating the product.', 'error');
      }
    });
  }

  deleteProduct(id: number) {
    // console.log('Deleting product:', product);
    // debugger;
    // let id = product.id;
    this.apiService.delete(id).subscribe({
      next: () => {
        this.openDialog('Success', 'Product deleted successfully!', 'success');
        this.getProducts();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.openDialog('Error', 'Error deleting the product.', 'error');
      }
    });
  }

  private openDialog(title: string, message: string, type: string) {
    this.dialog.open(MessageModalComponent, {
      data: { title, message, type }, 
    });
  }
  
}
