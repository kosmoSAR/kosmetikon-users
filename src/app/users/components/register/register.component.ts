import { Component, ElementRef, ViewChild } from '@angular/core';
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

  public states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  selectedStates = this.states;

  @ViewChild('txtTagInput') public tagInput!: ElementRef<HTMLInputElement>

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

  onKey() {
    this.selectedStates = this.search(this.tagInput.nativeElement.value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.states.filter(option => option.toLowerCase().startsWith(filter));
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

        console.log(loginUser);


        this._userService.login( loginUser ).subscribe({
          next: (resp => {
            this.cookies.set('access_token',resp.body.token)

            this.router.navigate(['dashboard'])
          })
        })
      }

}
