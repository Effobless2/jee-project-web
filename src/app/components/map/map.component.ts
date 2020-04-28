import { Component, ViewChild, Input } from "@angular/core";
import { AgmMap } from '@agm/core';

export interface Marker{
    lat: number,
    lng: number,
    label: string
}

export interface MapOnClickEvent{
    coords: {
        lat: number,
        lng: number
    };
    placeId: number;
}

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent{
    @Input() onClickEvent: (event :MapOnClickEvent) => any;

    @ViewChild('map') map: AgmMap;
    markers: Marker[] = [];

    public get coordinates() : {longitude: number, latitude: number}{
        return {
            longitude: this.map.longitude, 
            latitude: this.map.latitude
        };
    }

    public addMarker(marker: Marker) {
        this.markers.push(marker);
    }

    public clearMarkers() {
        this.markers = [];
    }
}