import {
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgIf, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // @Input() count = 0;
  constructor(
    public router: Router,
    public auth: AuthServiceService,
    public http: HttpClient,
  ) {}
  isloggedIn = false;
  user = {};
  ngOnInit(): void {
     this.auth.isLoggedIn$.subscribe((status) => {
      this.isloggedIn = status;
    });
  }



  logout() {
     this.auth.logout().subscribe();
  }
}
