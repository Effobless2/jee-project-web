import { Injectable } from '@angular/core';

@Injectable() export class GeolocationService {

  getCurrentPosition(callback: (position: Position) => void, error?: () => void) {
    navigator.geolocation.getCurrentPosition(callback, error);
  }
}
