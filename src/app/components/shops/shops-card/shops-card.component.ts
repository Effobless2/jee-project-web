import { Component, Input } from '@angular/core';
import { Trade } from 'src/app/models/Trade';
import { MatDialog } from '@angular/material/dialog';
import { ShopEditDialog } from '../../shop-edit-dialog/shop-edit-dialog';

@Component({
  selector: 'app-shops-card',
  templateUrl: './shops-card.component.html',
  styleUrls: ['./shops-card.component.css']
})
export class ShopsCardComponent {
  @Input() shop: Trade;

  constructor(public dialog: MatDialog) {}

  onEdit(){
    this.dialog.open(ShopEditDialog, {
      data: this.shop
    });
  }
}
