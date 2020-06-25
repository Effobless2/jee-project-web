import { Component, Input, Inject } from "@angular/core";
import { Trade } from 'src/app/models/Trade';
import { Beer } from 'src/app/models/Beer';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BeerService } from 'src/app/services/api/beer.service';
import { TradeService } from 'src/app/services/api/trade.service';

@Component({
    selector: 'app-beer-stock-modal',
    templateUrl: 'beer-stock-modal.component.html',
    styleUrls: ['beer-stock-modal.component.css']
})
export class BeerStockModalComponent {
    allBeers: Beer[] = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Trade,
        private beerService: BeerService,
        private tradeService: TradeService) {
            this.beerService.getAll(this.fullFillBeerList.bind(this));
    }

    private fullFillBeerList(beers: Beer[]) {
        this.allBeers = [...beers];
    }

    btnText(beer: Beer): string {
        if (this.isOnItems(beer))
            return 'Remove';
        return 'Add';
    }

    private isOnItems(beer: Beer): boolean {
        return this.data.items.some(b => b.id === beer.id)
    }

    addOrRemove(beer: Beer) {
        if (this.isOnItems(beer)) {
            this.removeBeer(beer);
        } else {
            this.addBeer(beer);
        }
    }

    addBeer(beer: Beer) {
        this.tradeService.addBeerToItems(this.data, beer, this.added.bind(this));
    }

    removeBeer(beer: Beer) {
        this.tradeService.removeBeertoItems(this.data, beer, this.removed.bind(this));
    }

    added(beer: Beer) {
        this.data.items.push(beer);
    }

    removed(beer: Beer) {
        this.data.items.splice(this.data.items.findIndex(b => b.id === beer.id), 1);
    }
}