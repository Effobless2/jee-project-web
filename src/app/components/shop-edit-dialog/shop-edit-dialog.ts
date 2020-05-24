import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Trade } from 'src/app/models/Trade';

@Component({
    selector: 'app-shop-edit-dialog',
    templateUrl: 'shop-edit-dialog.html',
    styleUrls: ['shop-edit-dialog.css']
})
export class ShopEditDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Trade) {}
}
