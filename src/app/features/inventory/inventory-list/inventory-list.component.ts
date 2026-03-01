import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Product } from '../../../core/models/product.model';
import { InventoryService } from '../../../core/services/inventory.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  displayedColumns: string[] = ['sku', 'name', 'category', 'stockLevel', 'status', 'actions'];

  searchControl = new FormControl('', { nonNullable: true });

  filteredProducts$: Observable<Product[]>;

  totalValue$: Observable<number>;
  lowStockCount$: Observable<number>;
  totalItems$: Observable<number>;

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog,
  ) {
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
    this.totalValue$ = this.inventoryService.products$.pipe(
      map(products => products.reduce((acc, p) => acc + (p.price * p.stockLevel), 0))
    );
    
    this.lowStockCount$ = this.inventoryService.products$.pipe(
      map(products => products.filter(p => p.stockLevel <= p.minThreshold).length)
    );

    this.totalItems$ = this.inventoryService.products$.pipe(
      map(products => products.length)
    );
  }

  ngOnInit(): void {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '450px',
      disableClose: false 
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.inventoryService.addProduct(result);
      }
    });
  }

  onDelete(id: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this SKU?');
    if (confirmDelete) {
      this.inventoryService.deleteProduct(id);
    }
  }

  onEdit(product: Product): void {
    console.log('Edit functionality to be implemented:', product);
  }
}