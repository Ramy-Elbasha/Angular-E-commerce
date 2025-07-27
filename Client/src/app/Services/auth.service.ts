import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  authURL = 'http://localhost:8000';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(public http: HttpClient) {}

  public login(user: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.post(this.authURL + '/login', user, {
      withCredentials: true,
      headers,
    }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(true);
      })
    );
  }

  public register(user: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.post(this.authURL + '/register', user, {
      withCredentials: true,
      headers,
    });
  }

  public logout(): Observable<any> {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.post(this.authURL + '/logout', '', {
      withCredentials: true,
      headers,
    }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(false);
      })
    );
  }

  public getuser(): Observable<any> {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.get(this.authURL + '/user', {
      withCredentials: true,
      headers,
    }).pipe(
      tap({
        next: () => this.isLoggedInSubject.next(true),
        error: () => this.isLoggedInSubject.next(false),
      })
    );
  }

  public getcsrf(): Observable<any> {
    return this.http.get(this.authURL + '/sanctum/csrf-cookie', {
      withCredentials: true,
    });
  }

  private getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      const [key, val] = c.trim().split('=');
      if (key === name) return decodeURIComponent(val);
    }
    return 'null';
  }
}
