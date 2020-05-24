import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-address-dialog',
    templateUrl: './address-list-modal.component.html',
    styleUrls: ['./address-list-modal.component.css']
})
export class AddressListModalComponent {
    public result: string;
    constructor(
        public dialogRef: MatDialogRef<AddressListModalComponent>,
        @Inject(MAT_DIALOG_DATA) public datas: {datas: string[], provider: (value: string) => any}) {
    }

    onClick(value: string) {
        this.dialogRef.close();
        if (this.datas.provider) {
            this.datas.provider(value);
        }
    }
}
