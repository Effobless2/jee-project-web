import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { BeersListComponent } from '../components/beers/beers-list/beers-list.component';
import { ShopsListComponent } from "../components/shops/shops-list/shops-list.component";
import { ROUTES } from './routes';


const routes: Routes = [
    //{ path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: ROUTES.root, component: HomeComponent },
  { path: ROUTES.about, component: AboutComponent },
  { path: ROUTES.beers, component: BeersListComponent },
  { path: ROUTES.shops, component: ShopsListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }