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
    if (this.isLogged()) {
      return this.http.get<any>(
        `${environment.url}/leet/${localStorage.getItem('username')}`,
        this.authHeaders
      );
    }
    return this.http.get<any>(`${environment.url}/leet/streak`);
  }

  getStreak(): Observable<any> {
    if (this.isLogged()) {
      return this.http.get<any>(
        `${environment.url}/leet/streak/${localStorage.getItem('username')}`,
        this.authHeaders
      );
    }
    return this.http.get<any>(
      `${environment.url}/leet/streak/${localStorage.getItem('username')}`
    );
  }

  startStreak(): Observable<any> {
    if (this.isLogged()) {
      return this.http.get<any>(
        `${environment.url}/leet/streak/begin/${localStorage.getItem(
          'username'
        )}`,
        this.authHeaders
      );
    }
    return this.http.get<any>(
      `${environment.url}/leet/streak/begin/${localStorage.getItem('username')}`
    );
  }

  getUsers(hash: string): Observable<any> {
    if (this.isLogged()) {
      return this.http.post<any>(
        `${environment.url}/leet/friends`,
        { hash: hash },
        this.authHeaders
      );
    }
    return this.http.post<any>(`${environment.url}/leet/friends`, hash);
  }

  makeFriends(hash: string): Observable<any> {
    if (this.isLogged()) {
      return this.http.post<any>(
        `${environment.url}/leet/friends/${localStorage.getItem('username')}`,
        { userHash: hash },
        this.authHeaders
      );
    }
    return this.http.post<any>(
      `${environment.url}/leet/friends/${localStorage.getItem('username')}`,
      hash
    );
  }

  addFriend(hash: string): Observable<any> {
    if (this.isLogged()) {
      return this.http.post<any>(
        `${environment.url}/leet/new_friend/${localStorage.getItem(
          'username'
        )}`,
        { hash: hash },
        this.authHeaders
      );
    }
    return this.http.post<any>(
      `${environment.url}/leet/new_friend/${localStorage.getItem('username')}`,
      hash
    );
  }

  myMessages(): Observable<any> {
    if (this.isLogged()) {
      return this.http.get<any>(
        `${environment.url}/leet/messages/${localStorage.getItem('username')}`,
        this.authHeaders
      );
    }
    return this.http.get<any>(
      `${environment.url}/leet/messages/${localStorage.getItem('username')}`
    );
  }

  myFriends(): Observable<any> {
    if (this.isLogged()) {
      return this.http.get<any>(
        `${environment.url}/leet/friends/${localStorage.getItem('username')}`,
        this.authHeaders
      );
    }
    return this.http.get<any>(
      `${environment.url}/leet/friends/${localStorage.getItem('username')}`
    );
  }
}
