import { Component } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ItemsService } from '../../Services/items.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CommonModule],
  templateUrl: './cart.component.html',
  styles: ``,
})
export class CartComponent {
  cartItems: any = [];
  totalPrice: number = 0;
  totalitems: number = 0;
  startDate = new Date();
  endDate = new Date();
  orders: any = [];
  constructor(public itemservice: ItemsService) {}
  ngOnInit() {
    this.itemservice.getCartItems().subscribe({
      next: (data: any) => {
        this.cartItems = data;
        this.totalitems = data.length;
        for (let i = 0; i < data.length; i++) {
          this.totalPrice += data[i].price * data[i].quantity;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    this.startDate.setDate(this.startDate.getDate() + 1);
    this.endDate.setDate(this.startDate.getDate() + 3);
  }
  getdata(e: any) {
    if (e == 0) {
      this.totalitems -= 1;
    } else {
      this.totalPrice += e;
    }
  }

  checkout() {
    let order = {
      items: this.cartItems,
      totalPrice: parseFloat(
        (this.totalPrice + this.totalPrice * 0.12).toFixed(3)
      ),
    };
    this.itemservice.addOrder(order).subscribe();
    for (const item of this.cartItems) {
      this.itemservice.deleteFromCart(item.id).subscribe();
    }
    this.cartItems = [];
    this.totalPrice = 0;
    this.totalitems = 0;
    alert('Checked out successfully');
  }
}
