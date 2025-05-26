import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  itemsurl = 'http://localhost:3000/items';
  cartitemsurl = 'http://localhost:3000/cart';
  ordersURL = 'http://localhost:3000/orders';
  profileURL = 'http://localhost:3000/profile';
  constructor(public http: HttpClient) {}
  getallitems() {
    return this.http.get(this.itemsurl);
  }
  getItemByID(id: any) {
    return this.http.get(this.itemsurl + '/' + id);
  }
  deleteItemByID(id: any) {
    return this.http.delete(this.itemsurl + '/' + id);
  }
  modifyItemById(id: any, item: any) {
    return this.http.put(this.itemsurl + '/' + id, item);
  }
  addtocart(item: any) {
    return this.http.post(this.cartitemsurl, item);
  }
  getCartItems() {
    return this.http.get(this.cartitemsurl);
  }
  updateCartItem(id: any, item: any) {
    return this.http.put(this.cartitemsurl + '/' + id, item);
  }
  deleteFromCart(id: any) {
    return this.http.delete(this.cartitemsurl + '/' + id);
  }
  additem(item: any) {
    return this.http.post(this.itemsurl, item);
  }
  addOrder(order: any) {
    return this.http.post(this.ordersURL, order);
  }
  getOrders() {
    return this.http.get(this.ordersURL);
  }
  getprofile() {
    return this.http.get(this.profileURL);
  }
  modifyprofile(info: any) {
    return this.http.put(this.profileURL, info);
  }
}
