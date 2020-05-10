import { Component } from "@angular/core";
import { Beer } from 'src/app/models/Beer';
import { BeerService } from 'src/app/services/api/beer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'beers-page',
    templateUrl: 'beers-page.component.html',
    styleUrls: ['beers-page.component.css']
})
export class BeersPageComponent {
    beers: Beer[] = [
        {name: "Leffe Blonde",
          profilePict: "../../assets/leffe_blonde.jpg",
          type: "Bière Blonde",
          alcoholLevel: 5,
          description: "Bonne binouze quand elle est fraiche"},
        {name: "Leffe Ruby",
          profilePict: "../../assets/image_218.jpg",
          type: "Bière Rouge",
          alcoholLevel: 5,
          description: "Meilleure binouze <3"},
        {name: "Kro",
          profilePict: "../../assets/leffe_blonde.jpg",
          type: "Bière Nulle",
          alcoholLevel: 4,
          description: "..."},
        {name: "Delirium",
          profilePict: "../../assets/leffe_blonde.jpg",
          type: "Bière Blonde",
          alcoholLevel: 7,
          description: "Tres tres bon"},
        {name: "Chouffe",
          profilePict: "../../assets/image_218.jpg",
          type: "Bière",
          alcoholLevel: 8,
          description: "Good"},
        {name: "Grim Red",
          profilePict: "../../assets/image_218.jpg",
          type: "Bière Rouge",
          alcoholLevel: 5,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis tellus ex, sed tincidunt diam pellentesque nec. Pellentesque ac mi tortor. Aenean magna ipsum, interdum eu lorem in, mattis interdum sapien. Sed elit orci, varius nec varius vitae, auctor a dui. Etiam quis dui odio. Pellentesque lobortis dolor non tristique facilisis. Integer porttitor nulla a dolor tempus, eget venenatis dui blandit. Curabitur eu facilisis massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut dapibus ultricies mi sit amet aliquet. Vestibulum vitae turpis eu nisl tempus scelerisque. Maecenas ut ligula ex."}
      ];

      
  constructor(private beerService: BeerService) {
    this.beerService.getAll(
      (beers: Beer[]) => {if(beers != []) this.beers = beers;},
      (error: HttpErrorResponse) => console.error(error)
    );
   }

}