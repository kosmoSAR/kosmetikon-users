import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map, startWith, tap } from 'rxjs';
import { Usuarios } from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';

export interface User {
  name: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public forms!: FormGroup;

  @ViewChild('txtTagInput') public tagInput!: ElementRef<HTMLInputElement>
  public cargos: any = [];
  public filteredOptions: any;

  constructor(private fb: FormBuilder, private _userService: UsersService, private _snackBar: MatSnackBar, private router: Router,
    private cookies: CookieService) {
    this.forms = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this._userService.getPositionList().subscribe({
      next: (resp) => {
        this.cargos = resp;
        this.filteredOptions = this.cargos;
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  filtro() {
    this._filter(this.tagInput.nativeElement.value)
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();

    this.filteredOptions = this.cargos.filter((cargo: any) => {
      return cargo.CARGO.toLowerCase().includes(filterValue)
    });

  }

  obtenerIdCargo(str: string) {
    const id = str.split('-')[0];
    return Number(id);
  }

  newUser() {

    const usuario: Usuarios = {
      NOMBRE: this.forms.value.nombre,
      APELLIDO: this.forms.value.apellido,
      FECHA_NACIMIENTO: this.forms.value.fechaNacimiento,
      EMAIL: this.forms.value.email,
      ID_CARGO: this.obtenerIdCargo(this.forms.value.cargo),
      PASSWORD: this.forms.value.password
    }

    this._userService.newUser(usuario).subscribe({
      next: (resp: any) => {
        this.createSnackBar()
      },
      error: (error: any) => {
        console.log(error.error);
        this.errorSnackBar(error.error)
      },
      complete: () => {
        this.login(usuario)
      }
    });
  }

  createSnackBar() {
    this._snackBar.open("Has añadido un nuevo cliente", "", {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  errorSnackBar(error: string) {
    this._snackBar.open(error, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  login(usuario: any) {

    const loginUser: any = {
      EMAIL: usuario.EMAIL,
      PASSWORD: usuario.PASSWORD
    }

    console.log(loginUser);


    this._userService.login(loginUser).subscribe({
      next: (resp => {
        this.cookies.set('access_token', resp.body.token)

        this.router.navigate(['dashboard'])
      })
    })
  }

}
