import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemsService } from '../../Services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth.service';

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
    public url: ActivatedRoute,
    private auth:AuthServiceService
  ) {}
  id: any;
  DBItem: any = {};
  itemUserId=-1;
  ngOnInit() {
    this.url.params.subscribe((params) => {
      this.id = params['id'];
      this.itemservice.getItemByID(this.id).subscribe({
        next: (data: any) => {
          const item=data.data;
          this.itemUserId=item.user_id;
          this.DBItem = item;
          this.itemForm.patchValue({
            Title: item.Title,
            Price: item.Price,
            Category: item.Category,
            imageURL: item.imageURL,
            Description: item.Description,
            
          });
          this.auth.getuser().subscribe({
            next:(user:any)=>{if(user.id!=this.itemUserId)
            {
              this.router.navigate(['/']);
            }
            }
          })
        },
        error: (err: any) => {
          this.router.navigate(['/error']);
          console.log(err);
        },
      });
    });
  }
  itemForm = new FormGroup({
    Title: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required),
    imageURL: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
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
      if (!this.itemForm.controls.Title.valid) {
        this.req.title = true;
        console.log('title');
      }
      if (!this.itemForm.controls.Price.valid) {
        this.req.price = true;
        console.log('price');
      }
      if (!this.itemForm.controls.Category.valid) {
        this.req.category = true;
        console.log('category');
      }
      if (!this.itemForm.controls.imageURL.valid) {
        this.req.imgurl = true;
        console.log('image');
      }
      if (!this.itemForm.controls.Description.valid) {
        this.req.description = true;
        console.log('description');
      }
    } else {
      this.itemservice.modifyItemById(this.id, this.itemForm.value).subscribe({
        next: (data) =>this.router.navigate(['/admin']) ,
        error: (err) => console.log(err),
      });
    }
  }
}
