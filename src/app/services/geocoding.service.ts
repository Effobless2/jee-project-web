import { Injectable } from '@angular/core';
import { MapsAPILoader, AgmGeocoder, Geocoder, GeocoderAddressComponent, GeocoderResult } from '@agm/core';

interface GeocoderAdressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

declare var google: any;

@Injectable()
export class GeocodingService {
    private geocoder: Geocoder;
    constructor(private apiLoader: MapsAPILoader) {
        this.apiLoader.load().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
    }

    findLocation(
        parameter: string|{lat: number, lng: number},
        callback: (locations: GeocoderResult[]) => void,
        error?: (status: string) => void) {
        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }
        const options = typeof(parameter) === 'string' ?
        {
            address: parameter
        } :
        {
            location: parameter
        };
        this.geocoder.geocode(
            options,
            (results: GeocoderResult[], status: string) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    callback(results);
                } else {
                    error(status);
            }
        });
    }
}
