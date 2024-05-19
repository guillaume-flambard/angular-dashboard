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
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() product: Product = {
    name: '',
    image: '',
    rating: 0,
    price: '',
  };

  onConfirm() {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
