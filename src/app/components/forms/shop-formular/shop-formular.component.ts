import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapComponent, Marker } from '../../map/map.component';

interface ShopFormularFields{
    name: string;
    description: string;
    longitude: number;
    lattitude: number;
    type: string;
    address: string;
    profilepic: string;
}


@Component({
    selector: 'shop-formular',
    templateUrl: './shop-formular.component.html',
    styleUrls: ['./shop-formular.component.css']
})
export class ShopFormularComponent{
    formGroup: FormGroup;
    @ViewChild('map') map: MapComponent;
    constructor(
        private formBuilder: FormBuilder
    ){
        this.formGroup = this.formBuilder.group({
            name: null,
            description: null,
            longitude: 0,
            lattitude: 0,
            type: null,
            address: null,
            profilepic: '4',
        } as ShopFormularFields);
    }

    onSubmit(values: ShopFormularFields){
    }

    get unsubmitable() : boolean{
        return Object.values(this.formGroup.value)
            .some((x: string|number) => 
                x === undefined || 
                x === null || (
                    typeof(x) === typeof("") &&
                    (x as string).length === 0)
                );
    }
}