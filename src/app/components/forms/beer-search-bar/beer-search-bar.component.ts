import { Component, Input } from "@angular/core";
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { beerTypes } from 'src/app/services/tools/beer.types';
import { BeerSearchService, BeerSearchDatas } from 'src/app/services/api/beerSearch.service';
import { Beer } from 'src/app/models/Beer';

interface SearchBeerFormularFields {
    name: string;
    types: FormArray | boolean[]; //for getting datas, it seems to be transformed as a boolean array
    alcoholLevel: number;
}

function multipleCheckboxRequireOne(fa: FormArray) {
    let valid = false;

    for (let x = 0; x < fa.length; ++x) {
        if (fa.at(x).value) {
            valid = true;
            break;
        }
    }
    return valid ? null : {
        multipleCheckboxRequireOne: true
    };
}

@Component({
    selector: 'beer-search-bar',
    templateUrl: 'beer-search-bar.component.html',
    styleUrls: ['beer-search-bar.component.css']
})
export class BeerSearchBarComponent {
    @Input('callback') callback: (beers: Beer[]) => any = (_) => { }
    formGroup: FormGroup;
    beerTypesForm: FormArray;
    beerTypes: string[] = beerTypes;

    constructor(private beerSearchService: BeerSearchService,
        private formBuilder: FormBuilder) {
        this.beerTypesForm = this.formBuilder.array(
            this.beerTypes.map((value: string) => this.formBuilder.control(false)),
            [multipleCheckboxRequireOne]
        );
        this.formGroup = this.formBuilder.group({
            name: null,
            types: this.beerTypesForm,
            alcoholLevel: null
        } as SearchBeerFormularFields);
    }

    onSearch() {
        let searchFilters: SearchBeerFormularFields = this.formGroup.value as SearchBeerFormularFields;
        let searchDatas: BeerSearchDatas = {
            name: searchFilters.name,
            types: beerTypes.filter((value: string, index: number) => searchFilters.types[index]),
            alcoholLevel: searchFilters.alcoholLevel
        }
        this.beerSearchService.get(searchDatas, this.callback);
    }

    get disabled(): boolean {
        return Object.values(this.formGroup.value as SearchBeerFormularFields).every((value: string | FormArray | number) => {
            return typeof (value) === "number" && (value === undefined || value === null) ||
                typeof (value) === "string" && !value ||
                typeof (value) !== "string" && typeof (value) !== "number" && !this.beerTypesForm.valid;
        });
    }
}