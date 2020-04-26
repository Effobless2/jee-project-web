import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface ShopFormularFields{
    name: string;
    description: string;
    longitude: string;
    lattitude: string;
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
    constructor(
        private formBuilder: FormBuilder
    ){
        console.log("Genretated");
        this.formGroup = this.formBuilder.group({
            name: '',
            description: '',
            longitude: '',
            lattitude: '',
            type: '',
            address: '',
            profilepic: '',
        } as ShopFormularFields);
    }

    onSubmit(values: ShopFormularFields){
        console.log(values);
    }
}