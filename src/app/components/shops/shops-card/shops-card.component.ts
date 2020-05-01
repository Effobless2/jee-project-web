import { Component, Input } from '@angular/core';
import { Trade } from 'src/app/models/Trade';

@Component({
  selector: 'app-shops-card',
  templateUrl: './shops-card.component.html',
  styleUrls: ['./shops-card.component.css']
})
export class ShopsCardComponent {
  @Input() shop: Trade;
}
