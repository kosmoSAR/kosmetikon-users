import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forms:FormGroup;
  loading:boolean = false;

  constructor(private fb:FormBuilder, private _snackBar:MatSnackBar, private router:Router, private _userService: UsersService,
    private cookies:CookieService){
    this.forms = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  ngOnInit(): void {
    if ( this.cookies.get('token') ) {
      this.firstLogout();
      this.router.navigate(['dashboard']);
    }
  }

  ingresar(){

    const user:any = {
      EMAIL: this.forms.value.email,
      PASSWORD: this.forms.value.password
    }

    this._userService.login( user ).subscribe({
      next: (resp:any) => {
        this.cookies.set('access_token',resp.body.token)
        this.router.navigate(['dashboard'])
      },
      error: (error:any) => {
        console.log(error);
        this.error()
      }
    })
    //jsanti3@gmail.com
    //123456
  }

  error(){
    this._snackBar.open('Usuario o contraseña ingresado son invalidos', "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  };

  firstLogout(){
    this._snackBar.open('Debes dar click en Logout primero', "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  };
}
