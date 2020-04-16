import { AuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { DisconnectUser } from '../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Injectable } from '@angular/core';
import { HttpService } from './api.service';
import { DisableToken } from '../store/actions/token.actions';

@Injectable()
export class AuthenticationService {
    constructor(
        private authService: AuthService,
        private store: Store<AppState>,
        private httpService: HttpService
    ){}

    async signIn(){
        let newUser: SocialUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.httpService.apiAuth(newUser.idToken);
    }

    async signOut(){
        await this.authService.signOut();
        this.store.dispatch(new DisconnectUser());
        this.store.dispatch(new DisableToken());
    }
}