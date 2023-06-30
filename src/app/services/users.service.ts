import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'http://kosmetikon.myqnapcloud.com:8769';
// pedir al Equipo de backend la URL de la nube

  constructor( private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/getUserList`);
  }

  newUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newUser`, { data: data });
  }

  updateUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateUser`, { data: data });
  }

  deleteUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/deleteUser`, { data: data });
  }


// NOTA
// se ha puesto en todos los casos this.http.post
// se debe cambiar por GET, POST, PUT, DELETE en cada caso
// ejemplo getUserList deberia ser:
//  return this.http.get<any[]>(`${this.baseUrl}/settings/saveDBDataInEnvFile`);
// ejemplo newUser deberia ser:
//  return this.http.post<any>(`${this.baseUrl}/settings/saveDBDataInEnvFile`, { data: data });
//
// NOTA
// el parametro data se tendra que poner por el tipo definido.

// coordinar esta informaciÃ³n con el Equipo de backend la URL de la nube

}
