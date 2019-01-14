// tslint:disable-next-line:max-line-length
import {EditResourceElementDialogComponent} from '../../viewers/capability-viewer/resource-diagram/resource-diagram/create-backbone-element/resource-element-dialog/edit-resource-element-dialog.component';
import {MatDialog} from '@angular/material';

export class EditAction {
  constructor(public dialog: MatDialog) {
  }

  execute(value) {
    const parse = JSON.parse(decodeURI(value.data));
    const dialogRef = this.dialog.open(EditResourceElementDialogComponent, {
      width: '500px',
      data: parse
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }
}
