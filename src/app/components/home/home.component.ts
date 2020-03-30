import { Component, Input } from "@angular/core";

@Component({
    selector: 'page-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent{
@Input('title') title: String = "Beerer";
}