import { Component, ViewChild, Input } from '@angular/core';
import { AgmMap } from '@agm/core';

export interface Marker {
    lat: number;
    lng: number;
    label: string;
    data?: any;
    labelColor?: string;
}

export interface MapOnClickEvent {
    coords: {
        lat: number,
        lng: number
    };
    placeId: number;
}

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent {
    public markers: Marker[] = [];
    @ViewChild('map') map: AgmMap;
    @Input() latitude = 0;
    @Input() longitude = 0;
    @Input() onClickedMapEvent: (event: MapOnClickEvent) => any = () => {};
    @Input() onClickedMarkerEvent: (marker: Marker, index: number) => any = () => {};



    public get coordinates(): {longitude: number, latitude: number} {
        return {
            longitude: this.map.longitude,
            latitude: this.map.latitude
        };
    }

    public addMarker(marker: Marker) {
        this.markers.push(marker);
    }

    public deleteMarker(index: number) {
        if (index < this.markers.length) {
            this.markers.splice(index, 1);
        }
    }

    public clearMarkers() {
        this.markers = [];
    }

    public setCenter(location: {lat: number, lng: number}) {
        this.latitude = Number(location.lat);
        this.longitude = Number(location.lng);
    }
}
