import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemsService } from '../../Services/items.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-additem',
  imports: [ReactiveFormsModule],
  providers: [ItemsService],
  templateUrl: './modify-item.component.html',
  styleUrl: './modify-item.component.css',
})
export class ModifyItemComponent {
  constructor(
    public itemservice: ItemsService,
    public router: Router,
    public url: ActivatedRoute
  ) {}
  id: any;
  DBItem: any = {};
  ngOnInit() {
    this.url.params.subscribe((params) => {
      this.id = params['id'];
      this.itemservice.getItemByID(this.id).subscribe({
        next: (data: any) => {
          this.DBItem = data;
          this.itemForm.patchValue({
            title: data.title,
            price: data.price,
            category: data.category,
            img: data.img,
            description: data.description,
          });
        },
        error: (err: any) => {
          this.router.navigate(['/error']);
          console.log(err);
        },
      });
    });
  }
  itemForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
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

  modifyitem() {
    if (!this.itemForm.valid) {
      if (!this.itemForm.controls.title.valid) {
        this.req.title = true;
        console.log('title');
      }
      if (!this.itemForm.controls.price.valid) {
        this.req.price = true;
        console.log('price');
      }
      if (!this.itemForm.controls.category.valid) {
        this.req.category = true;
        console.log('category');
      }
      if (!this.itemForm.controls.img.valid) {
        this.req.imgurl = true;
        console.log('image');
      }
      if (!this.itemForm.controls.description.valid) {
        this.req.description = true;
        console.log('description');
      }
    } else {
      this.itemservice.modifyItemById(this.id, this.itemForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.log(err),
      });
    }
  }
}
