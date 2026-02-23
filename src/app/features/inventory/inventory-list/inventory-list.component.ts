import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { InventoryService } from '../../../core/services/inventory.service';
import { Product } from '../../../core/models/product.model';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  displayedColumns: string[] = ['sku', 'name', 'category', 'stockLevel', 'status', 'actions'];

  searchControl = new FormControl('', { nonNullable: true });

  products$: Observable<Product[]> = this.inventoryService.products$;

  constructor(private inventoryService: InventoryService) {
    this.filteredProducts$ = combineLatest([
      this.inventoryService.products$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([products, searchTerm]) => 
        products.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  filteredProducts$: Observable<Product[]>;

  ngOnInit(): void {}

  onEdit(product: Product) {
    console.log('Editing:', product.name);
  }

  onDelete(id: string): void {
  if (confirm('Are you sure you want to delete this product?')) {
    this.inventoryService.deleteProduct(id);
  }
}
}