import { Component, Input } from '@angular/core';
import { BeerEditDialogComponent } from '../../beer-edit-dialog/beer-edit-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Beer } from 'src/app/models/Beer';

@Component({
  selector: 'app-beers-card',
  templateUrl: './beers-card.component.html',
  styleUrls: ['./beers-card.component.css']
})
export class BeersCardComponent {

  @Input() beer: Beer;
  constructor(public dialog: MatDialog) { }

  onEdit() {
    this.dialog.open(BeerEditDialogComponent, {
      data: this.beer
    });
  }
}
