import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormComponent>
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', [Validators.required, Validators.minLength(4)]],
      category: ['Electronics', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stockLevel: [0, [Validators.required, Validators.min(0)]],
      minThreshold: [5, Validators.required],
      status: ['In Stock']
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
