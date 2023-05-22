import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const authHeaders = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem('token') as string)['token']
    }`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LeetService {
  constructor(private http: HttpClient) {}
  isLogged() {
    const d = new Date();
    if (JSON.parse(localStorage.getItem('token') as string)) {
      if (
        d.toISOString() >
        JSON.parse(localStorage.getItem('token') as string)['expiry']
      ) {
        return false;
      }
      return true;
    }
    return false;
  }

  getUserDetails(): Observable<any> {
    if (this.isLogged()) {
      return this.http.get<any>(
        `${environment.url}/leet/${localStorage.getItem('username')}`,
        authHeaders
      );
    }
    return this.http.get<any>(`${environment.url}/leet/streak`);
  }

  getStreak(): Observable<any> {
    if (this.isLogged()) {
      return this.http.get<any>(
        `${environment.url}/leet/streak/${localStorage.getItem('username')}`,
        authHeaders
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
        authHeaders
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
        authHeaders
      );
    }
    return this.http.post<any>(`${environment.url}/leet/friends`, hash);
  }

  makeFriends(hash: string): Observable<any> {
    if (this.isLogged()) {
      return this.http.post<any>(
        `${environment.url}/leet/friends/${localStorage.getItem('username')}`,
        { userHash: hash },
        authHeaders
      );
    }
    return this.http.post<any>(
      `${environment.url}/leet/friends/${localStorage.getItem('username')}`,
      hash
    );
  }

  myMessages(): Observable<any> {
    if (this.isLogged()) {
      return this.http.get<any>(
        `${environment.url}/leet/messages/${localStorage.getItem('username')}`,
        authHeaders
      );
    }
    return this.http.get<any>(
      `${environment.url}/leet/messages/${localStorage.getItem('username')}`
    );
  }
}
