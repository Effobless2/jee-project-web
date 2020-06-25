import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { User } from 'src/app/models/User';
import { TradeService } from 'src/app/services/api/trade.service';
import { Trade } from 'src/app/models/Trade';

@Component({
    selector: 'app-my-shops-page',
    templateUrl: 'my-shops-page.component.html',
    styleUrls: ['my-shops-page.component.css']
})
export class MyShopsPageComponent{
    isConnected: boolean = false;
    trades: Trade[] = [];
    constructor(
        private store: Store<AppState>,
        private tradesService: TradeService) {
        store.select('token').subscribe(token => {
            this.isConnected = token !== null && token !== undefined;
            this.getMyShops();
        });
    }

    private getMyShops() {
        if(this.isConnected) {
            this.tradesService.getMine(this.setTradeList.bind(this));
        }
        else {
            this.trades = [];
        }
    }

    private setTradeList(trades: Trade[]) {
        this.trades = [...trades];
    }
}