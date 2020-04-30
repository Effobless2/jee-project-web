import { Component } from "@angular/core";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User';

@Component({
    selector: 'connection-button',
    templateUrl: './connection-button.component.html',
    styleUrls: ['./connection-button.component.css']
})
export class ConnectionBtnComponent{
    user: User = null;
    token: string = null;

    constructor(
        private authService: AuthenticationService,
        private store: Store<AppState>,
    ){
        this.store.select('user').subscribe(user => this.user = user);
        this.store.select('token').subscribe(token => this.token = token);
    }

    get connectBtnText() : String {
        return this.loggedIn ? this.user.name : "";
    }

    get userName(): string {
        return this.loggedIn ? this.user.name : "";
    }

    get loggedIn(): boolean {
        return this.user != null;
    }

    get avatarUrl(): string {
        return this.loggedIn ? this.user.avatarUrl : null;
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
