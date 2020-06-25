import { Component, Input } from '@angular/core';
import { BeerEditDialogComponent } from '../../beer-edit-dialog/beer-edit-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Beer } from 'src/app/models/Beer';
import { BeerSellersLocationComponent } from '../beer-sellers-location/beer-sellers-location.component';

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

  showLocation() {
    this.dialog.open(BeerSellersLocationComponent, {
      data: this.beer
    });
  }
}
