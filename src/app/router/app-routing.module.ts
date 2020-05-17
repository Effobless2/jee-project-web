import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { ShopsPageComponent } from "../components/shops/shops-page/shops-page.component";
import { ROUTES } from './routes';
import { BeerFormularComponent } from '../components/forms/beer-formular/beer-formular.component';
import { ShopFormularComponent } from '../components/forms/shop-formular/formular/shop-formular.component';
import { BeersPageComponent } from '../components/beers/beers-page/beers-page.component';


const routes: Routes = [
    //{ path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: ROUTES.root.path    , component: HomeComponent },
  { path: ROUTES.about.path   , component: AboutComponent },
  { path: ROUTES.beers.path   , component: BeersPageComponent },
  { path: ROUTES.shops.path   , component: ShopsPageComponent },
  { path: ROUTES.beerForm.path, component: BeerFormularComponent },
  { path: ROUTES.shopForm.path, component: ShopFormularComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
