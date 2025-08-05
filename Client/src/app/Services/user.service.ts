import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL = 'http://localhost:8000/user';

  constructor(private http:HttpClient) { }
   getuser() {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.get(this.userURL,{withCredentials:true,headers});
  }
  modifyuser(info: any) {
    const headers = new HttpHeaders().set(
      'X-XSRF-TOKEN',
      this.getCookie('XSRF-TOKEN')
    );
    return this.http.put(this.userURL, info,{withCredentials:true,headers});
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
