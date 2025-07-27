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
    Title: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Category: new FormControl('Mobile phones', Validators.required),
    imageURL: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
  });
  req: any = {
    Title: false,
    Price: false,
    Category: false,
    ImageURL: false,
    Description: false,
  };

  additem() {
    if (!this.item.valid) {
      if (!this.item.controls.Title.valid) {
        this.req.Title = true;
        console.log('title');
      }
      if (!this.item.controls.Price.valid) {
        this.req.Price = true;
        console.log('price');
      }
      if (!this.item.controls.Category.valid) {
        this.req.Category = true;
        console.log('category');
      }
      if (!this.item.controls.imageURL.valid) {
        this.req.imageURL = true;
        console.log('image');
      }
      if (!this.item.controls.Description.valid) {
        this.req.Description = true;
        console.log('description');
      }
    } else {
      this.itemservice.additem(this.item.value).subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      });
    }
  }
}
