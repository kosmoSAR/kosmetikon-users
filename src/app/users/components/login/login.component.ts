import { Component } from '@angular/core';
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
export class LoginComponent {

  forms:FormGroup;
  loading:boolean = false;

  constructor(private fb:FormBuilder, private _snackBar:MatSnackBar, private router:Router, private _userService: UsersService,
    private cookies:CookieService){
    this.forms = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  ingresar(){

    const user:any = {
      EMAIL: this.forms.value.email,
      PASSWORD: this.forms.value.password
    }

    console.log(user);

    this._userService.login( user ).subscribe({
      next: (resp:any) => {
        const headers = resp.headers;
        console.log(headers);
        // this.router.navigate(['dashboard'])
      },
      error: (error:any) => {
        console.log(error);
        this.error()
      }
    })

    //frankdeza@kosmetikon.es

  }

  error(){
    this._snackBar.open('Usuario o contraseña ingresado son invalidos', "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  };

  // fakeLoading(){
  //   this.loading = true;
  //   setTimeout(()=>{
  //     this.loading = false;
  //     this.router.navigate(['dashboard']);
  //     this._userService.getUserList().pipe(
  //       filter(  )
  //     ).subscribe(console.log)
  //   },1500)
  // }


}
