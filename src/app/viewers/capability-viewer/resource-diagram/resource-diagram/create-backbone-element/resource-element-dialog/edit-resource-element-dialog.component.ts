import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DiagramNodeElement} from "../../../model/DiagramNodeElement";

@Component({
  selector: 'app-resource-element-dialog',
  templateUrl: './edit-resource-element-dialog.component.html',
  styleUrls: ['./edit-resource-element-dialog.component.css']
})
export class EditResourceElementDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditResourceElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiagramNodeElement) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
