import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  itemsurl = 'http://localhost:8000';
  cartitemsurl = 'http://localhost:3000/cart';
  ordersURL = 'http://localhost:3000/orders';
  profileURL = 'http://localhost:3000/profile';
  constructor(public http: HttpClient) {}
  private getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      const [key, val] = c.trim().split('=');
      if (key === name) return decodeURIComponent(val);
    }
    return 'null';
  }
  getallitems() {
    return this.http.get(this.itemsurl+"/api/items");
  }
  getItemByID(id: any) {
    return this.http.get(this.itemsurl + '/api/items/' + id);
  }

  getUserItems()
  {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.get(this.itemsurl + '/userItems',{withCredentials:true,headers});
  }
  deleteItemByID(id: any) {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.delete(this.itemsurl + '/items/' + id,{withCredentials:true,headers});
  }
  modifyItemById(id: any, item: any) {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.put(this.itemsurl + '/items/' + id, item,{withCredentials:true,headers});
  }
  
  additem(item: any) {
     const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.post(this.itemsurl+"/items", item,{withCredentials:true,headers});
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
