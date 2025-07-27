import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  invalidLogin = false;
  user = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    public http: HttpClient
  ) {}

  public login() {
    this.authService.getcsrf().subscribe({
      next: () =>
        this.authService.login(this.user.value).subscribe({
          next: (data) => this.router.navigate(['/']),
          error: (err) => {
            this.invalidLogin = true;
            console.log(err);
          },
        }),
      error: (err) => {
        console.log(err);
      },
    });
  }
}
