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
    @Input() maxMarkers: number = 0;
    @Input() onClickEvent: (event :MapOnClickEvent) => any = (event) => {};

    @ViewChild('map') map: AgmMap;
    markers: Marker[] = [];

    public get coordinates() : {longitude: number, latitude: number}{
        return {
            longitude: this.map.longitude, 
            latitude: this.map.latitude
        };
    }

    public addMarker(marker: Marker){
        if(this.markers.length < this.maxMarkers)
            this.markers.push(marker);
        else{
            if(this.maxMarkers == 1){
                this.markers[0] = marker;
            }
        }
    }
}