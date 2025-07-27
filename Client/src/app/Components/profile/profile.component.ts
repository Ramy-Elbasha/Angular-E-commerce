import { Component } from '@angular/core';
import { ItemsService } from '../../Services/items.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any = {};
  orders: any = [];
  constructor(public itemService: ItemsService, public router: Router) {}
  ngOnInit() {
    this.itemService.getprofile().subscribe({
      next: (data) => (this.user = data),
      error: (err) => console.log(err),
    });
    this.itemService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.log(err),
    });
  }
  modifyprofile() {
    this.router.navigate(['/profile/1']);
  }
}
