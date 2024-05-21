import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { Product } from '../../../types';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  styleUrl: './edit-popup.component.scss',
  templateUrl: './edit-popup.component.html',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() product: Product = {
    name: '',
    image: '',
    rating: 0,
    price: '',
  };

  specialCharsValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );
      return hasSpecialChars ? { hasSpecialChars: true } : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharsValidator()]],
    image: [''],
    rating: [0],
    price: ['', [Validators.required]],
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const { name, image, rating, price } = this.productForm.value;
    this.confirm.emit({
      name: name || '',
      image: image || '',
      rating: rating || 0,
      price: price || '',
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
