import { Component } from '@angular/core';

@Component({
  selector: 'shared-title',
  template: `
  <div>
    <p>
      <mat-toolbar>
        <span class="example-spacer"></span>
        <span>{{ title }}</span>
        <span class="example-spacer"></span>
      </mat-toolbar>
    </p>
  </div>
  `,
  styleUrls: ['./title.component.css']
})
export class TitleComponent {

  public title: string = "GESTION DE USUARIOS"

}
