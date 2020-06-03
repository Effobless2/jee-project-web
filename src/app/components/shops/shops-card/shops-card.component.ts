import { Component, Input } from '@angular/core';
import { Trade } from 'src/app/models/Trade';
import { MatDialog } from '@angular/material/dialog';
import { ShopEditDialogComponent } from '../../shop-edit-dialog/shop-edit-dialog';

@Component({
    selector: 'app-shops-card',
    templateUrl: './shops-card.component.html',
    styleUrls: ['./shops-card.component.css']
})
export class ShopsCardComponent {
    @Input() shop: Trade;

    constructor(public dialog: MatDialog) { }

    onEdit() {
        this.dialog.open(ShopEditDialogComponent, {
            data: this.shop
        });
    }

    get description(): string{
        const max = 150;
        if(this.shop.description.length > max){
            return this.shop.description.slice(0, max) + "...";
        }
        return this.shop.description;
    }
}
