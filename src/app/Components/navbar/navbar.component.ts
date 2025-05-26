import { Component, EventEmitter, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // @Input() count = 0;
  constructor(public router: Router) {}
  moveToCart() {
    this.router.navigate(['/cart']);
  }
}
