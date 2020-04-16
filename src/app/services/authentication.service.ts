import { AuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { ConnectUser, DisconnectUser } from '../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Injectable } from '@angular/core';
import { HttpService } from './api.service';

@Injectable()
export class AuthenticationService {
    constructor(private authService: AuthService,  private store: Store<AppState>, private httpService: HttpService){}

    async signIn(){
        let newUser: SocialUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.store.dispatch(new ConnectUser(newUser));
        this.httpService.apiAuth(newUser.idToken);

    }

    async signOut(){
        await this.authService.signOut();
        this.store.dispatch(new DisconnectUser(null));
    }
}