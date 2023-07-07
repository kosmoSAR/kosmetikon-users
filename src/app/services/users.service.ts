import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';
// pedir al Equipo de backend la URL de la nube

  constructor( private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/getUserList`);
  }

  newUser(data: Usuarios): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newUser`, data , { headers: {'Content-Type': 'application/json'} });
  }

  updateUser(data: Usuarios): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/updateUser`, data , { headers: {'Content-Type': 'application/json'} });
  }

  deleteUser(data: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteUser`, {body: data} );
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data , { headers: {'Content-Type': 'application/json'}, observe: 'response' });
  }

  logout(data: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/logout`, {body: data} );
  }

}
