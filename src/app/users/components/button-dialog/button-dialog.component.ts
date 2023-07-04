import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog, DialogModule } from '@angular/cdk/dialog';


@Component({
  selector: 'shared-button-dialog',
  templateUrl: './button-dialog.component.html',
})
export class ButtonDialogComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(event: string) {
    this.dialog.open(modalUsers, {
      data: { user:null , event }
    });
  }
}

@Component({
  selector: 'dialog-elements-example-dialogmoda',
  templateUrl: 'dialog-elements-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatSelectModule],
})
export class modalUsers implements OnInit {

  public forms!: FormGroup;

  constructor(private fb:FormBuilder, private _userService: UsersService, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any){

    {
      if ( data.event === 'new' ) {
        this.forms = this.fb.group({
          nombre:['', Validators.required],
          apellido:['', Validators.required],
          fechaNacimiento:['', Validators.required],
          email:['', Validators.required],
          cargo:['', Validators.required],
          password:['', Validators.required],
        })
      } else if ( data.event === 'update' ){
        this.forms = this.fb.group({
          nombre:[data.user.nombre, Validators.required],
          apellido:[data.user.apellido, Validators.required],
          fechaNacimiento:[data.user.fechaNacimiento, Validators.required],
          email:[data.user.email, Validators.required],
          cargo:[data.user.cargo, Validators.required],
          password:[data.user.password, Validators.required],
        })
      }
    }
  }

  ngOnInit(): void {
  }

  newEditUser(){

    const usuario: Usuarios = {
      nombre: this.forms.value.nombre,
      apellido: this.forms.value.apellido,
      fechaNacimiento: this.forms.value.fechaNacimiento,
      email: this.forms.value.email,
      cargo: this.forms.value.cargo,
      password: this.forms.value.password
    }

    if ( this.data.event === 'update' ) {
      console.log(usuario);
      this.updateSnackBar()
    } else if ( this.data.event === 'new' ) {
      console.log(usuario);
      this.createSnackBar()
    }
  }

  createSnackBar() {
    this._snackBar.open("Has añadido un nuevo cliente", "",{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  updateSnackBar() {
    this._snackBar.open("Has actualizado al cliente", "",{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


}
