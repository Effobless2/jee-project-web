import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beers-card',
  templateUrl: './beers-card.component.html',
  styleUrls: ['./beers-card.component.css']
})
export class BeersCardComponent {

  @Input() beer:any
  constructor() { }
}
