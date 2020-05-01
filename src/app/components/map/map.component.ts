import { Component, ViewChild, Input } from "@angular/core";
import { AgmMap } from '@agm/core';

export interface Marker{
    lat: number;
    lng: number;
    label: string;
    data?: any;
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
    @Input() onClickedMapEvent: (event :MapOnClickEvent) => any = () => {};
    @Input() onClickedMarkerEvent: (marker: Marker, index: number) => any = () => {};

    @ViewChild('map') map: AgmMap;
    public markers: Marker[] = [];

    public get coordinates() : {longitude: number, latitude: number}{
        return {
            longitude: this.map.longitude,
            latitude: this.map.latitude
        };
    }

    public addMarker(marker: Marker) {
        this.markers.push(marker);
    }

    public deleteMarker(index: number){
        if(index < this.markers.length)
            this.markers.splice(index, 1);
    }

    public clearMarkers() {
        this.markers = [];
    }
}
