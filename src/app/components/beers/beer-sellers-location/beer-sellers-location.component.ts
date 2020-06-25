import { Component, Inject, ViewChild, OnInit, AfterContentInit, AfterViewInit } from "@angular/core";
import { Beer } from 'src/app/models/Beer';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { MapComponent } from '../../map/map.component';

@Component({
    selector: 'app-beer-sellers-location',
    templateUrl: 'beer-sellers-location.component.html',
    styleUrls: ['beer-sellers-location.component.css']
})
export class BeerSellersLocationComponent implements AfterViewInit{
    @ViewChild('map') map: MapComponent;
    latitude = 0;
    longitude = 0;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Beer,
        private locationService: GeolocationService) {
    }

    ngAfterViewInit(): void {
        this.locationService.getCurrentPosition(this.setUserLocation.bind(this));
        if(this.data && this.data.sellers)
            this.data.sellers.forEach(trade => {
                this.map.addMarker({
                    label: trade.name,
                    lat: trade.latitude,
                    lng: trade.longitude,
                    labelColor: 'black'
                });
            });
    }

    setUserLocation(position: Position) {
        this.map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        this.map.addMarker({
            label: 'You are Here',
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }
}