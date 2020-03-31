import { Component, Input } from "@angular/core";

import { Store } from '@ngrx/store';
import { AppState } from "./../../store/app.state";
import * as CounterActions from './../../store/actions/counter.actions'

@Component({
    selector: 'page-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent{
    title: String = "Beerer";

    constructor(private store: Store<AppState>){
    }

    increment(){
        this.store.dispatch(new CounterActions.IncrementCounter());
    }

    decrement(){
        this.store.dispatch(new CounterActions.DecrementCounter());
    }
}