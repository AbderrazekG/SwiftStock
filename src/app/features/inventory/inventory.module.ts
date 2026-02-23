import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventoryListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Required for [formControl]
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,  // Required for <mat-form-field>
    MatInputModule       // Required for <input matInput>
  ]
})
export class InventoryModule { }
