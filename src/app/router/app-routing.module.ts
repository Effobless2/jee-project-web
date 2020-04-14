import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { BeersListComponent } from '../components/beers-list/beers-list.component';
import { ShopsListComponent } from "../components/shops-list/shops-list.component";

const routes: Routes = [
    //{ path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'beers-list', component: BeersListComponent },
  { path: 'shops-list', component: ShopsListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
