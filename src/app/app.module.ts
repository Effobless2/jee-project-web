import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './layouts/root/app.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule, WavesModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select'
// import { MatDatepickerModule } from '@angular/material/datepicker'
// import { MatNativeDateModule } from '@angular/material/core'
// import { MatCardModule } from '@angular/material/card'
// import { MatToolbarModule } from '@angular/material/toolbar'
// import { MatFormFieldModule } from '@angular/material/form-field'
// import { MatSnackBarModule } from '@angular/material/snack-bar'
// import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HeaderComponent } from './layouts/header/header.component';
import { BodyComponent } from './layouts/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ConnectionBtnComponent } from './components/connection-button/connection-button.component';

import { AppRoutingModule } from './router/app-routing.module';
import { environment } from 'src/environments/environment';

import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { userReducer } from './store/reducers/user.reducer';
import { tokenReducer } from './store/reducers/token.reducer';
import { AuthenticationService } from './services/authentication.service';
import { BeersListComponent } from './components/beers/beers-list/beers-list.component';
import { BeersCardComponent } from './components/beers/beers-card/beers-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShopsListComponent } from './components/shops/shops-list/shops-list.component';
import { ShopsCardComponent } from './components/shops/shops-card/shops-card.component';
import { HttpService } from './services/tools/http.service';
import { UserService } from './services/api/user.service';
import { BeerService } from './services/api/beer.service';
import { TradeService } from './services/api/trade.service';
import { ShopFormularComponent } from './components/forms/shop-formular/formular/shop-formular.component';
import { MapComponent } from './components/map/map.component';
import { BeerFormularComponent } from './components/forms/beer-formular/beer-formular.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ToasterService } from './services/tools/toaster.service';
import { GeocodingService } from './services/geocoding.service';
import { GeolocationService } from './services/geolocation.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AddressListModalComponent } from './components/forms/shop-formular/modal/address-list-modal.component';
import { BeersPageComponent } from './components/beers/beers-page/beers-page.component';
import { AppState } from './store/app.state';
import { BeerSearchService } from './services/api/beerSearch.service';
import { BeerSearchBarComponent } from './components/forms/beer-search-bar/beer-search-bar.component';
import { ShopEditDialogComponent } from './components/shop-edit-dialog/shop-edit-dialog';
import { BeerEditDialogComponent } from './components/beer-edit-dialog/beer-edit-dialog';
import { ShopSearchBarComponent } from './components/forms/shop-search-bar/shop-search-bar.component';
import { ShopsPageComponent } from './components/shops/shops-page/shops-page.component';
import {TradeSearchService} from './services/api/tradeSearch.service';
import { MyShopsPageComponent } from './components/my-shops/my-shops-page/my-shops-page.component';
import { MyShopsCardComponent } from './components/my-shops/my-shops-item/my-shops-card.component';
import { MyShopsListComponent } from './components/my-shops/my-shops-list/my-shops-list.component';
import { BeerStockModalComponent } from './components/my-shops/beer-stock-modal/beer-stock-modal.component';
import { BeerSellersLocationComponent } from './components/beers/beer-sellers-location/beer-sellers-location.component';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleAPIClientId, googleLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}

const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  token: tokenReducer
};
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['user', 'token'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


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
    AddressListModalComponent,
    BeerFormularComponent,
    MapComponent,
    FileUploaderComponent,
    BeersPageComponent,
    BeerSearchBarComponent,
    ShopEditDialogComponent,
    BeerEditDialogComponent,
    ShopSearchBarComponent,
    ShopsPageComponent,
    MyShopsPageComponent,
    MyShopsCardComponent,
    MyShopsListComponent,
    BeerStockModalComponent,
    BeerSellersLocationComponent,
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(
      reducers,
      {metaReducers}
    ),
    AppRoutingModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    WavesModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleCloudAPIClientId
    }),
    ToastrModule.forRoot(),
    FormsModule,
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
    HttpService,
    ToasterService,
    GeocodingService,
    GeolocationService,
    BeerSearchService,
    TradeSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
