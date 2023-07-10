import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {

  constructor(private cookies: CookieService){

  }
  ngOnInit(): void {
    this.cookies.get('acccess_token')
  }

}
