import { Component, Input } from '@angular/core';
import { BeerEditDialog } from '../../beer-edit-dialog/beer-edit-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-beers-card',
  templateUrl: './beers-card.component.html',
  styleUrls: ['./beers-card.component.css']
})
export class BeersCardComponent {

  @Input() beer:any
  constructor(public dialog: MatDialog) { }

  onEdit(){
    this.dialog.open(BeerEditDialog, {
      data: this.beer
    });
  }
}
