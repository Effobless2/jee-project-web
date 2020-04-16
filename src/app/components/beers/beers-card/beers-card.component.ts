import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-beers-card',
  templateUrl: './beers-card.component.html',
  styleUrls: ['./beers-card.component.css']
})
export class BeersCardComponent implements OnInit {

  @Input() beer:any
  constructor() { }

  ngOnInit(): void {

  }

}
