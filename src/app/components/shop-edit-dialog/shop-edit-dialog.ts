import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Trade } from 'src/app/models/Trade';

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'shop-edit-dialog.html',
    styleUrls: ['shop-edit-dialog.css']
})
export class DialogDataExampleDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Trade) {}
}