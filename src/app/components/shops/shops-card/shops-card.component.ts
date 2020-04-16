import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops-card',
  templateUrl: './shops-card.component.html',
  styleUrls: ['./shops-card.component.css']
})
export class ShopsCardComponent implements OnInit {

  shops = [
    {"name": "The Soul Cat",
      "profilepic": "../../assets/thesoulcat.jpg",
      "type": "Pub irlandais",
      "address": "5 Allée Raymond Nègre, 94340 Joinville-le-Pont",
      "phone": "0145146776",
      "desc": "Meilleur bar du monde, à (re)découvrir dès la réouverture du monde extérieur !"},
    {"name": "Monoprix Joinville",
      "profilepic": "../../assets/monop.jpg",
      "type": "Supermarché",
      "address": "20-24 rue de Paris, 94340 Joinville-le-Pont",
      "phone": "0123456789",
      "desc": "Seule source d'approvisionnement en ce moment, permet de se procurer des bonnes binouzes malgré tout."}]

  constructor() { }

  ngOnInit(): void {
  }

}
