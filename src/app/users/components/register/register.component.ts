import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Usuarios } from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public forms!: FormGroup;

  constructor(private fb:FormBuilder, private _userService: UsersService, private _snackBar: MatSnackBar, private router:Router,
    private cookies:CookieService) {
        this.forms = this.fb.group({
          nombre:['', Validators.required],
          apellido:['', Validators.required],
          fechaNacimiento:['', Validators.required],
          email:['', [Validators.required, Validators.email]],
          cargo:['', Validators.required],
          password:['', Validators.required],
        })
    }

    newUser(){

      const usuario: Usuarios = {
        NOMBRE: this.forms.value.nombre,
        APELLIDO: this.forms.value.apellido,
        FECHA_NACIMIENTO: this.forms.value.fechaNacimiento,
        EMAIL: this.forms.value.email,
        CARGO: this.forms.value.cargo,
        PASSWORD: this.forms.value.password
      }

        this._userService.newUser( usuario ).subscribe({
          next: ( resp: any ) => {
            this.createSnackBar()
          },
          error: ( error: any ) => {
            console.log(error.error);
            this.errorSnackBar( error.error )
          },
          complete: () => {
            this.login( usuario )
          }
        });
      }

      createSnackBar() {
        this._snackBar.open("Has añadido un nuevo cliente", "",{
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }

      errorSnackBar( error: string ) {
        this._snackBar.open( error, "",{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }

      login( usuario: any ){
        const loginUser:any = {
          EMAIL: usuario.EMAIL,
          PASSWORD: usuario.PASSWORD
        }

        this._userService.login( loginUser ).subscribe({
          next: (resp => {
            this.cookies.set('token',resp.body.token)
            this.router.navigate(['dashboard'])
          })
        })
      }

}
