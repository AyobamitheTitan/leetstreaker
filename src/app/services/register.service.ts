import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) {}

  createUser(user:User):Observable<Response>{
    return this.http.post<Response>(`${environment.url}/v1/signup`,user)
  }

  logUser(user:User):Observable<Response>{
    return this.http.post<Response>(`${environment.url}/v1/login`,user)
  }
}
