import { Component } from '@angular/core';
import { ROUTES, URLDatas } from '../../router/routes';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
    selector: 'app-page-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    routes: URLDatas[] = Object.values(ROUTES).map((route: URLDatas) => route).slice(1);
    title: string;
    isConnected = false;

    constructor(
        private router: Router,
        private location: Location, 
        private store: Store<AppState>) {
        this.router.events.subscribe((_) => {
            Object.values(ROUTES).map((route: URLDatas) => {
                if (route.path === this.location.path().slice(1)) {
                    this.title = route.title;
                }
            });
        });
        this.store.select('user').subscribe(user => this.isConnected = user !== null && user !== undefined);
    }
}
