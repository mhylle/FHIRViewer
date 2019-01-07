import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({

  imports: [
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class MaterialImportModule {
}
