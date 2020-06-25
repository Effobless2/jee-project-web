import { Component, OnInit, Input } from '@angular/core';
import { Trade } from 'src/app/models/Trade';

@Component({
    selector: 'app-my-shops-list',
    templateUrl: './my-shops-list.component.html',
    styleUrls: ['./my-shops-list.component.css']
})
export class MyShopsListComponent implements OnInit {
  @Input() shops: Trade[];

  ngOnInit(): void {
  }
}
