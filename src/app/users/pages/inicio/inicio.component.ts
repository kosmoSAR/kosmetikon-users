import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Usuarios } from '../../../interfaces/users.interface';

@Component({
  selector: 'users-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  forms:FormGroup;
  loading:boolean = false;
  loginForm:boolean = true;
  registerLogin:boolean = false;

  constructor(private fb:FormBuilder, private _snackBar:MatSnackBar, private router:Router, private _userService: UsersService){
    this.forms = this.fb.group({
      usuario: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  ingresar(){
    const user:any = {
      EMAIL: this.forms.value.usuario,
      PASSWORD: this.forms.value.password
    }

    // const correoUser = this.forms.value.usuario;

    // this._userService.getUserList().pipe(
    //   map( user => user.data),
    //   filter( (user, index) => user[index].EMAIL === correoUser),
    //   tap( filteredUsers => console.log(filteredUsers))
    // ).subscribe( )

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

  loginOn(){
    this.loginForm = true;
    this.registerLogin = false;
  }

  registerOn(){
    this.loginForm = false;
    this.registerLogin = true;
  }

}
