import { Component, OnInit, Input } from '@angular/core';
import { Trade } from 'src/app/models/Trade';

@Component({
    selector: 'app-shops-list',
    templateUrl: './shops-list.component.html',
    styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {
  @Input() shops: Trade[];

  ngOnInit(): void {
  }
}
