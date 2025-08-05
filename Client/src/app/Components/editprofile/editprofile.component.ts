import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemsService } from '../../Services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-editprofile',
  imports: [ReactiveFormsModule],
  providers: [ItemsService],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent {
  constructor(
    public UserService: UserService,
    public itemservice: ItemsService,
    public router: Router,
    public url: ActivatedRoute
  ) {}
  id: any;
  user: any;
  ngOnInit() {
    this.UserService.getuser().subscribe({
      next: (data: any) => {
        this.user = data;
        console.log(this.user);
        this.profileForm.patchValue({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        });
      },
      error: (err: any) => {
        this.router.navigate(['/login']);
        console.log(err);
      },
    });

  }
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
  req: any = {
    name: false,
    email: false,
    phone: false,
    address: false,
    jobTitle: false,
  };

  modifyUser() {
    if (!this.profileForm.valid) {
      if (!this.profileForm.controls.name.valid) {
        this.req.name = true;
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
  
    } else {
      this.UserService.modifyuser(this.profileForm.value).subscribe({
        next: () => this.router.navigate(['/profile']),
        error: (err: any) => console.log(err),
      });
    }
  }
}
