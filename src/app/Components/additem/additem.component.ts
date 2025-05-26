import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemsService } from '../../Services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additem',
  imports: [ReactiveFormsModule],
  providers: [ItemsService],
  templateUrl: './additem.component.html',
  styleUrl: './additem.component.css',
})
export class AdditemComponent {
  constructor(public itemservice: ItemsService, public router: Router) {}
  item = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('Mobile phones', Validators.required),
    img: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  req: any = {
    title: false,
    price: false,
    category: false,
    imgurl: false,
    description: false,
  };

  additem() {
    if (!this.item.valid) {
      if (!this.item.controls.title.valid) {
        this.req.title = true;
        console.log('title');
      }
      if (!this.item.controls.price.valid) {
        this.req.price = true;
        console.log('price');
      }
      if (!this.item.controls.category.valid) {
        this.req.category = true;
        console.log('category');
      }
      if (!this.item.controls.img.valid) {
        this.req.imgurl = true;
        console.log('image');
      }
      if (!this.item.controls.description.valid) {
        this.req.description = true;
        console.log('description');
      }
    } else {
      this.itemservice.additem(this.item.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.log(err),
      });
    }
  }
}
