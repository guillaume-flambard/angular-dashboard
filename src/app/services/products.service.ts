import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams, Products } from '../../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get(url, { params, responseType: 'json' });
  };

  addProduct = (url: string, product: any): Observable<any> => {
    return this.apiService.post(url, product, {});
  };

  editProduct = (url: string, product: any): Observable<any> => {
    return this.apiService.put(url, product, {});
  };

  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}
