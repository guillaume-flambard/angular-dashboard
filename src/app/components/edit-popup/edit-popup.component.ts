import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';
import {Product} from '../../../types';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, InputTextModule, ButtonModule],
  styleUrl: './edit-popup.component.scss',
  templateUrl: './edit-popup.component.html',
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Input() header!: string;

  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<void>();

  @Input() product: Product = {
    name: '',
    image: '',
    rating: 0,
    price: '',
  };
  @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>();

  onConfirm() {
    this.confirm.emit(this.product);
  }

  onCancel() {
    this.display = false;
  }
}
