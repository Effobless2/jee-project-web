import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';

@Component({
    selector: 'page-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    user: User = null;
    token: string = null;

    constructor(
        private authService: AuthenticationService,
        private store: Store<AppState>
    ){
        this.store.select('user').subscribe(user => this.user = user);
        this.store.select('token').subscribe(token => this.token = token);
    }

    get connectBtnText() : String {
        return this.loggedIn ? "Sign Out" : "Sign In";
    }


    //TODO : Move all logic and objects into a store to implement
    get loggedIn(): boolean {
        return this.user != null;
    }

    async connectionMethod(): Promise<void> {
        this.loggedIn ? this.signOut() : this.signInWithGoogle();
    }
  
    async signInWithGoogle(): Promise<void> {
        await this.authService.signIn();
    }

    async signOut(): Promise<void> {
        await this.authService.signOut();
    }
  }