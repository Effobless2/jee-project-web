import { Component } from '@angular/core';
import { TradeService } from "src/app/services/api/trade.service";
import { Trade } from "src/app/models/Trade";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'shops-page',
  templateUrl: './shops-page.component.html',
  styleUrls: ['./shops-page.component.css']
})
export class ShopsPageComponent {

  shops: Trade[];

  constructor(
    private shopService: TradeService) {
    this.loadFromServer();
  }

  fullFillBeers(shops: Trade[]) {
    this.shops = shops;
  }

  loadFromServer() {
    this.shopService.getAll(
      this.fullFillBeers.bind(this),
      (error: HttpErrorResponse) => console.error(error)
    );
  }

}
