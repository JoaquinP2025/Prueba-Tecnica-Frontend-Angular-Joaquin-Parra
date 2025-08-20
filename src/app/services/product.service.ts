import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Producto 1', price: 10, stock: 5 },
    { id: 2, name: 'Producto 2', price: 20, stock: 3 }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  addProduct(product: Product) {
    // Asignar un ID simple incremental
    const newId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    product.id = newId;
    this.products.push(product);
    this.productsSubject.next(this.products);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next(this.products);
  }
}



