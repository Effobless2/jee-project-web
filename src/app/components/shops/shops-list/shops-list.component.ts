import { Component, OnInit } from '@angular/core';
import { TradeService } from 'src/app/services/api/trade.service';
import { Trade } from 'src/app/models/Trade';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-shops-list',
    templateUrl: './shops-list.component.html',
    styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {
    /* shops = [
        {'name': 'The Soul Cat',
        'profilepic': '../../assets/thesoulcat.jpg',
        'type': 'Pub irlandais',
        'address': '5 Allée Raymond Nègre, 94340 Joinville-le-Pont',
        'phone': '0145146776',
        'desc': 'Meilleur bar du monde, à (re)découvrir dès la réouverture du monde extérieur !'},
        {'name': 'Monoprix Joinville',
        'profilepic': '../../assets/monop.jpg',
        'type': 'Supermarché',
        'address': '20-24 rue de Paris, 94340 Joinville-le-Pont',
        'phone': '0123456789',
        'desc': 'Seule source d'approvisionnement en ce moment, permet de se procurer des bonnes binouzes malgré tout.'
        }] */

    shops: Trade[];
    constructor(private shopService: TradeService) {
        shopService.getAll(
            (shops: Trade[]) => this.shops = shops,
            (error: HttpErrorResponse) => console.error(error),
        );
     }

    ngOnInit(): void {
    }
}
