import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-create-backbone-element',
  templateUrl: './create-backbone-element.component.html',
  styleUrls: ['./create-backbone-element.component.css']
})
export class CreateBackboneElementComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateBackboneElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
