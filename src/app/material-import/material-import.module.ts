import {NgModule} from '@angular/core';
import {MatCheckboxModule, MatMenuModule, MatSelectModule, MatTableModule, MatToolbarModule} from '@angular/material';

@NgModule({

  imports: [
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule
  ],
  exports: [
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule
  ]
})
export class MaterialImportModule {
}
