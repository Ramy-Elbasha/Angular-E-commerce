import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  emailexist=false;
 user=new FormGroup({
  name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
 })
  constructor(private userservice:AuthServiceService, private router:Router){}
 public signup()
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
          this.emailexist = true;
          console.log(err);
        },
      });
    },
  });
 }
}
