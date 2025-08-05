import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any = {};
  orders: any = [];
  isAuthenticated = true;
  constructor(public UserService: UserService, public router: Router) {}
  ngOnInit() {
    this.UserService.getuser().subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
      },
      error: (err) => {
        console.log(err);
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      },
    });
    // this.User.getOrders().subscribe({
    //   next: (data) => {
    //     this.orders = data;
    //   },
    //   error: (err) => console.log(err),
    // });
  }
  modifyprofile() {
    this.router.navigate([`/profile/edit`]);
  }
}
