import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/interfaces/users.interface';


@Component({
  selector: 'shared-button-dialog',
  templateUrl: './button-dialog.component.html',
  styleUrls: ['./button-dialog.component.css']
})
export class ButtonDialogComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
})
export class DialogElementsExampleDialog {

  public forms:FormGroup;

  constructor(private fb:FormBuilder){
    this.forms = this.fb.group({
      nombre:[''],
      apellido:[''],
      fechaNacimiento:[''],
      email:[''],
      cargo:[''],
      password:[''],
    })
  }

  crearUsuario(){
    const usuario: Usuarios = {
      isEdit: false,
      nombre: this.forms.value.nombre,
      apellido: this.forms.value.apellido,
      fechaNacimiento: this.forms.value.fechaNacimiento,
      email: this.forms.value.email,
      cargo: this.forms.value.cargo,
      password: this.forms.value.password
    }

    console.log(usuario);

  }


}
