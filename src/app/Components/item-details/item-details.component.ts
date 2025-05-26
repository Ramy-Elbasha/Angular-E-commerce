import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { ItemsService } from '../../Services/items.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-details',
  imports: [ItemComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent {
  item: any = {};
  relateditems: any = [];
  description: any = {};
  id = 0;
  quantity = new FormControl(1);

  constructor(
    public itemservice: ItemsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadItem(this.id);
      this.loadRelatedItems();
    });
  }

  loadRelatedItems() {
    this.itemservice.getallitems().subscribe({
      next: (data: any) => {
        this.relateditems = data
          .filter(
            (relateditem: any) =>
              relateditem.category === this.item.category &&
              relateditem.title !== this.item.title
          )
          .slice(0, 4);
      },
    });
  }
  loadItem(id: number) {
    this.itemservice.getItemByID(id).subscribe({
      next: (data: any) => {
        this.item = data;
        this.description = data.description;
      },
      error: (err) => console.log(err),
    });
  }
  addToCart() {
    let cartItem: any = {
      id: this.item.id,
      title: this.item.title,
      price: this.item.price,
      quantity: this.quantity.value,
      img: this.item.img,
    };

    this.itemservice.addtocart(cartItem).subscribe({
      next: (data) => {},
      error: (err) => console.log(err),
    });
    alert('Item added to cart');
  }
}
