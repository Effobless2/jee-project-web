import { AuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { ConnectUser, DisconnectUser } from '../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    constructor(private authService: AuthService,  private store: Store<AppState>){}

    async signIn(){
        let newUser: SocialUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.store.dispatch(new ConnectUser(newUser));
    }

    async signOut(){
        await this.authService.signOut();
        this.store.dispatch(new DisconnectUser(null));
    }
}