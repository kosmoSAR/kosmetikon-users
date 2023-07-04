import { Component, ElementRef, Inject, NgModule, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-password',
  template: `
  <h2 style="text-align: center;">Escribe la contraseña</h2>
    <mat-form-field class="example-full-width" style="margin: 1rem;">
      <mat-label>Password</mat-label>
      <input matInput placeholder="Contraseña" (keyup.enter)="PasswordEdit()" #txtTagInput>
    </mat-form-field>
  `
})

export class ModalPasswordComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _userService: UsersService,
    private _snackBar: MatSnackBar
  ) {
    console.log(data);
  }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  PasswordEdit(){
    const userInfo = {
      EMAIL: this.data.user,
      PASSWORD: this.tagInput.nativeElement.value,
    }
    console.log(userInfo);

    this._userService.deleteUser( userInfo ).subscribe({
      next: ( resp: any ) => {
        console.log(resp);
        this.deleteSnackBar();
        this.dialogRef.close()
        window.location.href = "./index.html"
      },
      error: ( error: any ) => {
        this.errorSnackBar( error.error.message )
      }
    })
  }

  deleteSnackBar() {
    this._snackBar.open("Has eliminado el usuario", "",{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  errorSnackBar( error: string ) {
    this._snackBar.open( error, "",{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
