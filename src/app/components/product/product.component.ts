import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RatingModule} from 'primeng/rating';
import {Product} from '../../../types';
import {ButtonModule} from "primeng/button";
import {ConfirmationService} from "primeng/api";
import {ConfirmPopupModule} from "primeng/confirmpopup";

@Component({
  selector: 'app-product',
  standalone: true,
  providers: [ConfirmationService],
  imports: [RatingModule, FormsModule, CommonModule, ButtonModule, ConfirmPopupModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {

  @ViewChild('deleteButton') deleteButton: any;
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private confirmationService: ConfirmationService) {
  }

  editProduct() {
    this.edit.emit(this.product);
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      }
    });
  }

  ngOnInit() {
    console.log('ProductComponent initialized');
  }

}
