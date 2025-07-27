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
  selector: 'app-editprofile',
  imports: [ReactiveFormsModule],
  providers: [ItemsService],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent {
  constructor(
    public itemservice: ItemsService,
    public router: Router,
    public url: ActivatedRoute
  ) {}
  id: any;
  user: any;
  ngOnInit() {
    this.url.params.subscribe((params) => {
      this.id = params['id'];
      this.itemservice.getprofile().subscribe({
        next: (data: any) => {
          this.user = data;
          console.log(this.user);
          this.profileForm.patchValue({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            jobTitle: data.jobTitle,
          });
        },
        error: (err: any) => {
          this.router.navigate(['/error']);
          console.log(err);
        },
      });
    });
  }
  profileForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    jobTitle: new FormControl('', Validators.required),
  });
  req: any = {
    fullName: false,
    email: false,
    phone: false,
    address: false,
    jobTitle: false,
  };

  modifyitem() {
    if (!this.profileForm.valid) {
      if (!this.profileForm.controls.fullName.valid) {
        this.req.fullName = true;
        console.log('fullName');
      }
      if (!this.profileForm.controls.email.valid) {
        this.req.email = true;
        console.log('email');
      }
      if (!this.profileForm.controls.phone.valid) {
        this.req.phone = true;
        console.log('phone');
      }
      if (!this.profileForm.controls.address.valid) {
        this.req.address = true;
        console.log('address');
      }
      if (!this.profileForm.controls.jobTitle.valid) {
        this.req.jobTitle = true;
        console.log('jobTitle');
      }
    } else {
      this.itemservice.modifyprofile(this.profileForm.value).subscribe({
        next: () => this.router.navigate(['/profile']),
        error: (err: any) => console.log(err),
      });
    }
  }
}
