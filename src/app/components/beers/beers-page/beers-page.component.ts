import { Component } from '@angular/core';
import { Beer } from 'src/app/models/Beer';
import { BeerService } from 'src/app/services/api/beer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-beers-page',
  templateUrl: 'beers-page.component.html',
  styleUrls: ['beers-page.component.css']
})
export class BeersPageComponent {
  beers: Beer[];

  constructor(
    private beerService: BeerService) {
    this.loadFromServer();
  }

  fullFillBeers(beers: Beer[]) {
    this.beers = beers;
  }

  loadFromServer() {
    this.beerService.getAll(
      this.fullFillBeers.bind(this),
      (error: HttpErrorResponse) => console.error(error)
    );
  }

}
