import {Component} from '@angular/core';
import {MatDialog} from "@angular/material";
import {DialogOverviewExampleDialogComponent} from "./dialog-overview-example-dialog/dialog-overview-example-dialog.component";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.css'],
  entryComponents: [DialogOverviewExampleDialogComponent],
})
export class DialogTestComponent {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
