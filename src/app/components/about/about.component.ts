import { Component, OnInit } from "@angular/core";
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
    selector: 'page-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    title = 'Beerer';
    
      constructor(private authService: AuthService){}
  
      get connectBtnText() : String {
          return this.loggedIn ? "Sign Out" : "Sign In";
      }


    //TODO : Move all logic and objects into a store to implement
    user: SocialUser;
    loggedIn: boolean;

    connectionMethod(): void {
        this.loggedIn ? this.signOut() : this.signInWithGoogle();
    }
  
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
        this.loggedIn = false;
        this.user = null;
    }
  
    ngOnInit(): void {
        this.authService.authState.subscribe((user: SocialUser) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
    }
  }