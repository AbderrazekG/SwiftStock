import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryService } from '../../../core/services/inventory.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  // 1. Define the columns to show in the table
  displayedColumns: string[] = ['sku', 'name', 'category', 'stockLevel', 'status', 'actions'];
  
  // 2. The data source is our Observable
  products$: Observable<Product[]> = this.inventoryService.products$;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {}

  // 3. Simple action handler for the training
  onEdit(product: Product) {
    console.log('Editing:', product.name);
  }
}