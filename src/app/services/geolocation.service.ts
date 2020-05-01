import { Injectable } from '@angular/core';

@Injectable() export class GeolocationService {

  getCurrentPosition(callback: (position: Position) => void){
    navigator.geolocation.getCurrentPosition(callback);
  }
}