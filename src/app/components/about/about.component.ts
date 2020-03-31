import { Component, OnInit } from "@angular/core";
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'page-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    title = 'Beerer';
    user: SocialUser = null;
    
      constructor(private authService: AuthenticationService, private store: Store<AppState>){
          store.select('user').subscribe(user => this.user = user);
      }
  
      get connectBtnText() : String {
          return this.loggedIn ? "Sign Out" : "Sign In";
      }


    //TODO : Move all logic and objects into a store to implement
    get loggedIn(): boolean {
        return this.user != null;
    }

    connectionMethod(): void {
        this.loggedIn ? this.signOut() : this.signInWithGoogle();
    }
  
    async signInWithGoogle(): Promise<void> {
        await this.authService.signIn();
    }

    async signOut(): Promise<void> {
        await this.authService.signOut();
    }
  }