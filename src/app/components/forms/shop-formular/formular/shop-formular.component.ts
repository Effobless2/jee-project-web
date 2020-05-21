import { Component, ViewChild, NgZone, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapComponent, MapOnClickEvent, Marker } from '../../../map/map.component';
import { FileUploaderComponent, FileSelectChangeEvent } from '../../../file-uploader/file-uploader.component';
import { Trade } from 'src/app/models/Trade';
import { TradeService } from 'src/app/services/api/trade.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from 'src/app/services/tools/toaster.service';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/router/routes';
import { AddressListModalComponent } from '../modal/address-list-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { GeocoderResult } from '@agm/core';
import { GeolocationService } from 'src/app/services/geolocation.service';

interface ShopFormularFields{
    id?: number;
    name: string;
    description: string;
    longitude: number;
    lattitude: number;
    type: string;
    address: string;
    profilePict: string|File;
}

@Component({
    selector: 'shop-formular',
    templateUrl: './shop-formular.component.html',
    styleUrls:  ['./shop-formular.component.css']
})
export class ShopFormularComponent implements OnInit{
    @Input('trade') trade: Trade = null;

    formGroup: FormGroup;
    @ViewChild('map') map: MapComponent;
    @ViewChild('fileUploader') fileUploader: FileUploaderComponent;

    constructor(
        private tradeService: TradeService,
        private geocoderService: GeocodingService,
        private geolocationService: GeolocationService,
        
        private formBuilder: FormBuilder,
        private toatrService: ToasterService,
        private router: Router,
        private dialog: MatDialog,
        private ngZone: NgZone
    ){
        this.formGroup = this.formBuilder.group({
            name: null,
            description: null,
            longitude: null,
            lattitude: null,
            type: null,
            address: null,
            profilePict: null,
        } as ShopFormularFields);
    }

    ngOnInit(){
        if(this.trade){
            this.formGroup = this.formBuilder.group(this.trade as ShopFormularFields);
            setTimeout(_ => {
                this.map.addMarker({
                    lat: this.trade.lattitude,
                    lng: this.trade.longitude,
                    label: "ICI"
                } as Marker);
                this._updateMapCenter({lat: this.trade.lattitude, lng: this.trade.longitude});
                this.fileUploader.imagePict = this.trade.profilePict as string;
            },0);
        }
        else
            this.geolocationService.getCurrentPosition(this._updateMapCenterFromPos.bind(this));
    }

    private _updateMapCenterFromPos(pos: Position){
        this._updateMapCenter({ lat: pos.coords.latitude, lng:pos.coords.longitude });
    }

    get unsubmitable() : boolean{
        return Object.values(this.formGroup.value)
            .some((x: string|number|File) => {
                return x === undefined || 
                    x === null || (
                        typeof(x) === "string" &&
                        (x as string).length === 0
                    )
            }
        ) || (
            this.trade !== null &&
            Object.keys(this.formGroup.value)
                .every((key: string) => 
                    this.formGroup.value[key] === this.trade[key]
                )
        );
    }

    get submitButtonLabel() : string{
        return this.trade === null ? "Create" : "Update";
    }

    get locationUnsearchable(): boolean{
        let address: string = (this.formGroup.value as ShopFormularFields).address;
        return !address || address.length === 0;
    }

    mapOnClick(event: MapOnClickEvent){
        this.map.clearMarkers();
        this.map.addMarker({
            lat: event.coords.lat,
            lng: event.coords.lng,
            label: "ICI"
        } as Marker);
        this.ngZone.run(() => {
            this.map.setCenter(event.coords);
        });
        this._updateCoordsForm(event.coords.lat, event.coords.lng);
        this.geocoderService.findLocation(event.coords, this._openDialog.bind(this),
        _ => this._showError(null, null, "Adresse introvable"));
    }

    markerOnClick(_marker: Marker, index: number){
        this.map.deleteMarker(index);
        this._updateCoordsForm(null, null);
    }

    onFileSelected(_event: FileSelectChangeEvent){
        this.formGroup.patchValue({
            profilePict: this.fileUploader.image
        });
    }

    private _updateCoordsForm(lattitude: number, longitude: number){
        this.formGroup.patchValue({
            lattitude: lattitude,
            longitude: longitude
        });
    }

    private _updateAddress(value: string){
        this.formGroup.patchValue({
            address: value
        });
    }

    private _updateMapCenter(loc: {lat: number, lng: number}){
        this.map.setCenter(loc);
    }

    onSubmit(values: ShopFormularFields){
        let trade: Trade = values;
        if(this.trade === null)
            this.tradeService.post(
                trade,
                (id: number) => {
                    trade.id = id;
                    this._showSuccess(trade);
                },
                (error: HttpErrorResponse) => {
                    this._showError(trade, error);
                });
        else
            this.tradeService.put(
                trade,
                (id: number) => {
                    trade.id = id;
                    this._showSuccess(trade);
                },
                (error: HttpErrorResponse) => {
                    this._showError(trade, error);
                });
    }

    searchLocation(){
        let address: string = (this.formGroup.value as ShopFormularFields).address;
        this.geocoderService.findLocation(address, this._addMarker.bind(this), () => this._showError(null, null, "Location not found"));
    }

    private _addMarker(locations: GeocoderResult[]) {
        this.map.clearMarkers();
        let loc = {lat: locations[0].geometry.location.lat(), lng:locations[0].geometry.location.lng() };
        this.map.addMarker({
            lat: loc.lat,
            lng: loc.lng,
            label: "ICI"
        } as Marker);
        this._updateCoordsForm(loc.lat, loc.lng);
        this.ngZone.run(() => {
            this._updateMapCenter(loc);
        });
    }

    private _showError(trade: Trade, error: HttpErrorResponse, message?: string){
        this.ngZone.run(() => {
            this.toatrService.error(
                "Une erreur est survenue !",
                message ?? error.message
                );
        });
    }

    private _showSuccess(trade: Trade){
        this.toatrService.success(
            `Votre commerce ${trade.name} a été créé !`,
            "Vous pourrez y accéder à tout moment depuis votre profil"
        ).onTap.subscribe(() => this.router.navigate([ROUTES.shops.path]));
    }

    private _openDialog(values: GeocoderResult[]): void {
        this.ngZone.run(() => 
            this.dialog.open(AddressListModalComponent, {
                data: {
                    datas: values.map((x: GeocoderResult) => x.formatted_address),
                    provider: this._updateAddress.bind(this)
                }
            })
        );
    }
}