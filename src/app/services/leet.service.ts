import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeetService {
  public authHeaders = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${
        localStorage.getItem('token')
          ? JSON.parse(localStorage.getItem('token') as string)['token']
          : ''
      }`,
    }),
  };
  constructor(private http: HttpClient) {}
  isLogged() {
    const d = new Date();
    if (JSON.parse(localStorage.getItem('token') as string)) {
      if (
        d.toISOString() >
        JSON.parse(localStorage.getItem('token') as string)['expiry']
      ) {
        localStorage.clear();
        return false;
      }
      return true;
    }
    localStorage.clear();

    return false;
  }

  getUserDetails(): Observable<any> {
    
    return this.http.get<any>(
      `${environment.url}/leet/${localStorage.getItem('username')}`,
      this.authHeaders
    );
  }

  getStreak(): Observable<any> {
    this.authHeaders.headers = new HttpHeaders({
      Authorization: `Bearer ${
        localStorage.getItem('token')
          ? JSON.parse(localStorage.getItem('token') as string)['token']
          : ''
      }`,
    });

    return this.http.get<any>(
      `${environment.url}/leet/streak/${localStorage.getItem('username')}`,
      this.authHeaders
    );
  }

  startStreak(): Observable<any> {
    return this.http.get<any>(
      `${environment.url}/leet/streak/begin/${localStorage.getItem(
        'username'
      )}`,
      this.authHeaders
    );
  }

  getUsers(hash: string): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/leet/friends`,
      { hash: hash },
      this.authHeaders
    );
  }

  makeFriends(hash: string): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/leet/friends/${localStorage.getItem('username')}`,
      { userHash: hash },
      this.authHeaders
    );
  }

  addFriend(hash: string): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/leet/new_friend/${localStorage.getItem('username')}`,
      { hash: hash },
      this.authHeaders
    );
  }

  myMessages(): Observable<any> {
    return this.http.get<any>(
      `${environment.url}/leet/messages/${localStorage.getItem('username')}`,
      this.authHeaders
    );
  }

  myFriends(): Observable<any> {
    return this.http.get<any>(
      `${environment.url}/leet/friends/${localStorage.getItem('username')}`,
      this.authHeaders
    );
  }
}
