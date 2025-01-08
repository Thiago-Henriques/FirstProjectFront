import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/Product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiFirstProjectUrl;
  private productEndpoint = 'Product'; 

  constructor(private http: HttpClient) {}

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.buildUrl(this.productEndpoint)).pipe(
      catchError(this.handleError)
    );
  }

  post(product: Product): Observable<number> {
    return this.http.post<number>(this.buildUrl(this.productEndpoint), product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  put(product: Product): Observable<number> {
    return this.http.put<number>(this.buildUrl(this.productEndpoint), product).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(this.buildUrl(`${this.productEndpoint}?id=${id}`)).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred: ', error);
    return throwError(() => new Error('An error occurred during the request processing. Please try again later.'));
  }
}
