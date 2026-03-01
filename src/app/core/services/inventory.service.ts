import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private productsItems$ = new BehaviorSubject<Product[]>([]);

  public products$: Observable<Product[]> = this.productsItems$.asObservable();

  constructor() {
    this.loadMockData();
  }

  getLowStockAlerts(): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.stockLevel <= p.minThreshold))
    );
  }

  updateStock(productId: string, newQuantity: number): void {
    const currentProducts = this.productsItems$.value;
    const index = currentProducts.findIndex(p => p.id === productId);

    if (index !== -1) {
      currentProducts[index].stockLevel = newQuantity;
      this.productsItems$.next([...currentProducts]);
    }
  }

  private loadMockData() {
    const mockProducts: Product[] = [
      { id: '1', name: 'Dell XPS 15', sku: 'LAP-XPS15', category: 'Electronics', price: 1500, stockLevel: 5, minThreshold: 10, status: 'Low Stock' },
      { id: '2', name: 'Ergonomic Chair', sku: 'FUR-CHAIR-01', category: 'Furniture', price: 300, stockLevel: 25, minThreshold: 5, status: 'In Stock' }
    ];
    this.productsItems$.next(mockProducts);
  }

  deleteProduct(id: string): void {
    const updatedProducts = this.productsItems$.value.filter(p => p.id !== id);
    this.productsItems$.next(updatedProducts);
  }

  addProduct(product: Product): void {
    const currentProducts = this.productsItems$.value;
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    this.productsItems$.next([newProduct, ...currentProducts]);
  }
}
