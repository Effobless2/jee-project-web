import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './layouts/root/app.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MatRadioModule } from '@angular/material/radio'
//import { MatButtonModule } from '@angular/material/button'
//import { MatCheckboxModule } from '@angular/material/checkbox'
//import { MatInputModule } from '@angular/material/input'
//import { MatSelectModule } from '@angular/material/select'
//import { MatDatepickerModule } from '@angular/material/datepicker'
//import { MatNativeDateModule } from '@angular/material/core'
//import { MatCardModule } from '@angular/material/card'
//import { MatToolbarModule } from '@angular/material/toolbar'
//import { MatMenuModule } from '@angular/material/menu'
//import { MatFormFieldModule } from '@angular/material/form-field'
//import { MatSnackBarModule } from '@angular/material/snack-bar'
//import { MatDialogModule } from '@angular/material/dialog'
//import { MatIconModule } from '@angular/material/icon'

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HeaderComponent } from './layouts/header/header.component';
import { BodyComponent } from './layouts/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

import { AppRoutingModule } from './router/app-routing.module';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store'
import { userReducer } from './store/reducers/user.reducer';
import { AuthenticationService } from './services/authentication.service';

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
    AboutComponent
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer
    }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
