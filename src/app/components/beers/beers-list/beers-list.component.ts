import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/models/Beer';

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.css']
})
export class BeersListComponent implements OnInit {
  @Input() beers: Beer[];

  ngOnInit(): void {
  }
}
