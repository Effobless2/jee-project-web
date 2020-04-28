import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapComponent, MapOnClickEvent, Marker } from '../../map/map.component';
import { FileUploaderComponent, FileSelectChangeEvent } from '../../file-uploader/file-uploader.component';
import { Trade } from 'src/app/models/Trade';
import { TradeService } from 'src/app/services/api/trade.service';

interface ShopFormularFields{
    name: string;
    description: string;
    longitude: number;
    lattitude: number;
    type: string;
    address: string;
    profilepic: string|File;
}

@Component({
    selector: 'shop-formular',
    templateUrl: './shop-formular.component.html',
    styleUrls: ['./shop-formular.component.css']
})
export class ShopFormularComponent{
    formGroup: FormGroup;
    @ViewChild('map') map: MapComponent;
    @ViewChild('fileUploader') fileUploader: FileUploaderComponent;

    constructor(
        private tradeService: TradeService,

        private formBuilder: FormBuilder
    ){
        this.formGroup = this.formBuilder.group({
            name: null,
            description: null,
            longitude: null,
            lattitude: null,
            type: null,
            address: null,
            profilepic: null,
        } as ShopFormularFields);
    }

    onSubmit(values: ShopFormularFields){
        let trade: Trade = values;
        this.tradeService.post(trade, (id: number) => {
            console.log(`Created :${id}`);
        });
    }

    get unsubmitable() : boolean{
        return Object.values(this.formGroup.value)
            .some((x: string|number|File) => 
                x === undefined || 
                x === null || (
                    typeof(x) === "string" &&
                    (x as string).length === 0
                )
            );
    }

    mapOnClick(event: MapOnClickEvent){
        this.map.clearMarkers();
        this.map.addMarker({
            lat: event.coords.lat,
            lng: event.coords.lng,
            label: "ICI"
        } as Marker);
        this.formGroup.patchValue({
            lattitude: event.coords.lat
        });
        this.formGroup.patchValue({
            longitude: event.coords.lng
        });
    }

    onFileSelected(_event: FileSelectChangeEvent){
        this.formGroup.patchValue({
            profilepic: this.fileUploader.image
        });
    }
}