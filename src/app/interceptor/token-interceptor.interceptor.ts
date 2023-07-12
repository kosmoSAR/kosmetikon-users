import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookies:CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = `access_token=${this.cookies.get('access_token')}`

    const headers = new HttpHeaders({
      // "Set-Cookie": token,
      'Content-Type': 'application/json'
    });

    const headersClone = request.clone({headers})

    return next.handle(headersClone)
  }
}
