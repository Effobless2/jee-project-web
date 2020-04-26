import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './layouts/root/app.component';
import { MatMenuModule } from '@angular/material/menu'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule, WavesModule  } from 'angular-bootstrap-md'
import { ReactiveFormsModule } from '@angular/forms';
//import { MatRadioModule } from '@angular/material/radio'
//import { MatButtonModule } from '@angular/material/button'
//import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInputModule } from '@angular/material/input'
//import { MatSelectModule } from '@angular/material/select'
//import { MatDatepickerModule } from '@angular/material/datepicker'
//import { MatNativeDateModule } from '@angular/material/core'
//import { MatCardModule } from '@angular/material/card'
//import { MatToolbarModule } from '@angular/material/toolbar'
//import { MatFormFieldModule } from '@angular/material/form-field'
//import { MatSnackBarModule } from '@angular/material/snack-bar'
//import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HeaderComponent } from './layouts/header/header.component';
import { BodyComponent } from './layouts/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ConnectionBtnComponent } from './components/connection-button/connection-button.component';

import { AppRoutingModule } from './router/app-routing.module';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store'
import { userReducer } from './store/reducers/user.reducer';
import { tokenReducer } from './store/reducers/token.reducer';
import { AuthenticationService } from './services/authentication.service';
import { BeersListComponent } from './components/beers/beers-list/beers-list.component';
import { BeersCardComponent } from "./components/beers/beers-card/beers-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ShopsListComponent } from './components/shops/shops-list/shops-list.component';
import { ShopsCardComponent } from "./components/shops/shops-card/shops-card.component";
import { HttpService } from './services/tools/http.service'
import { UserService } from './services/api/user.service';
import { BeerService } from './services/api/beer.service';
import { TradeService } from './services/api/trade.service';
import { ShopFormularComponent } from './components/forms/shop-formular/shop-formular.component';
import { BeerFormularComponent } from './components/forms/beer-formular/beer-formular.component';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleAPIClientId, googleLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    AboutComponent,
    BeersListComponent,
    BeersCardComponent,
    ShopsListComponent,
    ShopsCardComponent,
    ConnectionBtnComponent,
    ShopFormularComponent,
    BeerFormularComponent
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer,
      token: tokenReducer
    }),
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    WavesModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthenticationService,
    UserService,
    BeerService,
    TradeService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }