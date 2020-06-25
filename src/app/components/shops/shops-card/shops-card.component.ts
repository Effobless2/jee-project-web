import { Component, Input } from '@angular/core';
import { Trade } from 'src/app/models/Trade';

@Component({
    selector: 'app-shops-card',
    templateUrl: './shops-card.component.html',
    styleUrls: ['./shops-card.component.css']
})
export class ShopsCardComponent {
    @Input() shop: Trade;

    constructor() { }


    get description(): string {
        const max = 150;
        if (this.shop.description.length > max) {
            return this.shop.description.slice(0, max) + '...';
        }
        return this.shop.description;
    }
}
