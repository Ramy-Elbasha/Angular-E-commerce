import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../Services/items.service';
import { DnoneDirective } from '../../Directives/dnone.directive';
@Component({
  selector: 'app-cart-item',
  imports: [FormsModule, CommonModule, DnoneDirective],
  templateUrl: './cart-item.component.html',
  styleUrl: 'cart-item.component.css',
})
export class CartItemComponent {
  constructor(public itemservice: ItemsService) {}
  @Input() item: any = [];
  quantity = 0;
  @Output() quantityEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  ngOnInit() {
    this.quantity = +this.item.quantity;
  }
  increment() {
    if (this.quantity) {
      this.quantity += 1;
      this.quantityEvent.emit(this.item.price);
      this.item.quantity = this.quantity;
      this.itemservice.updateCartItem(this.item.id, this.item).subscribe({
        next: (data: any) => {},
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
  decrement() {
    if (this.quantity && this.quantity > 1) {
      this.quantity -= 1;
      this.item.quantity = this.quantity;
      this.quantityEvent.emit(-this.item.price);
    }
  }
  delete() {
    this.itemservice.deleteFromCart(this.item.id).subscribe({
      next: (data: any) => {},
      error: (err: any) => {
        console.log(err);
      },
    });
    this.quantityEvent.emit(-this.item.price * this.quantity);
    this.quantity = 0;
    this.item = {};
    this.quantityEvent.emit(this.quantity);
  }
}
