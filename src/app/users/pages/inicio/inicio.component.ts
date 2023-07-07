import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'users-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  forms:FormGroup;
  loading:boolean = false;

  constructor(private fb:FormBuilder, private _snackBar:MatSnackBar, private router:Router){
    this.forms = this.fb.group({
      usuario: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  ingresar(){
    const USUARIO = this.forms.value.usuario;
    const PASSWORD = this.forms.value.password;

    if (USUARIO == "santi123" && PASSWORD == "admin123") {
      // Redireccionamos al Dashboard
      this.fakeLoading();
    } else{
      this.error();
      this.forms.reset();
    }
  }

  error(){
    this._snackBar.open('Usuario o contraseña ingresado son invalidos', "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  };

  fakeLoading(){
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
      this.router.navigate(['dashboard']);
    },1500)
  }

}
