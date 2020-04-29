import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'src/app/models/Shop';

@Component({
  selector: 'app-shops-card',
  templateUrl: './shops-card.component.html',
  styleUrls: ['./shops-card.component.css']
})
export class ShopsCardComponent implements OnInit {

  @Input() shop: Shop;
  constructor() { }

  ngOnInit(): void {
  }

}
