import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeetService {
  constructor(private http: HttpClient) {}
  isLogged() {
    const d = new Date()
    if (JSON.parse(localStorage.getItem('token') as string)) {
      if (d.toISOString() > JSON.parse(localStorage.getItem('token') as string)['expiry']) {
        return false
      }
      return true;
    }
    return false;
  }

  getUserDetails(): Observable<any> {
    if (this.isLogged()) {
      return this.http.get<any>(`${environment.url}/leet/${localStorage.getItem('username')}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token') as string)['token']
          }`,
        },
      });
    }
    return this.http.get<any>(`${environment.url}/leet/streak`)
  }

  getStreak():Observable<any>{
    if (this.isLogged()) {
      return this.http.get<any>(`${environment.url}/leet/streak/${localStorage.getItem('username')}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token') as string)['token']
          }`,
        },
      });
    }
    return this.http.get<any>(`${environment.url}/leet/streak/${localStorage.getItem('username')}`)
  }

  startStreak():Observable<any>{
   if (this.isLogged()) {
     return this.http.get<any>(
       `${environment.url}/leet/streak/begin/${localStorage.getItem('username')}`,
       {
         headers: {
           Authorization: `Bearer ${
             JSON.parse(localStorage.getItem('token') as string)['token']
           }`,
         },
       }
     );
   }
   return this.http.get<any>(
     `${environment.url}/leet/streak/begin/${localStorage.getItem('username')}`
   )
  }
}
