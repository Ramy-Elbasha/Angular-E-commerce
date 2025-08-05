import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
    req: any = {
    name: false,
    email: false,
    phone: false,
    address: false,
  };
  constructor(
    private userservice: AuthServiceService,
    private router: Router
  ) {}
  public signup() {
     if (!this.user.valid) {
      if (!this.user.controls.name.valid) {
        this.req.name = true;
        console.log('fullName');
      }
      if (!this.user.controls.email.valid) {
        this.req.email = true;
        console.log('email');
      }
      if (!this.user.controls.phone.valid) {
        this.req.phone = true;
        console.log('phone');
      }
      if (!this.user.controls.address.valid) {
        this.req.address = true;
        console.log('address');
      }
    }
    else
    {
    this.userservice.getcsrf().subscribe({
      next: () => {
        console.log('CSRF token retrieved');
        this.userservice.register(this.user.value).subscribe({
          next: (data) => {
            // console.log('User registered successfully');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
  }
}
