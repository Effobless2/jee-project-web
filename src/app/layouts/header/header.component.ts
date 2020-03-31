import { Component, OnInit } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Counter } from '../../models/counter.model'
import { Observable } from 'rxjs';

@Component({
    selector: 'page-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    counter: Counter;

    constructor(private store: Store<AppState>) {
        let obs: Observable<Counter> = store.select('counter');
        obs.subscribe(newCounter => this.counter = newCounter);
        
    }

    ngOnInit(): void {
    }

}