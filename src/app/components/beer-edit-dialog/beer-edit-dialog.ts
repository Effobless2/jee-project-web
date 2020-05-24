import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beer } from 'src/app/models/Beer';

@Component({
    selector: 'app-beer-edit-dialog',
    templateUrl: 'beer-edit-dialog.html',
    styleUrls: ['beer-edit-dialog.css']
})
export class BeerEditDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Beer) {}
}
