import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../tools/http.service';
import { Trade } from 'src/app/models/Trade';
import { HttpErrorResponse } from '@angular/common/http';

export interface TradeSearchData {
  name?: string;
  types?: string[];
  lng?: number;
  lat?: number;
}

@Injectable()
export class TradeSearchService {
  private controllerUrl = `${environment.beererApiUrl}trades/search`;

  constructor(private httpService: HttpService) {}

  get(data: TradeSearchData, callback: (result: Trade[]) => any, error?: (err: HttpErrorResponse) => any) {
    return this.httpService
      .get(`${this.controllerUrl}?name=${data.name ?? '' }&types=${data.types ?? '' }&lng=${data.lng ?? ''}&lat=${data.lat ?? ''}`)
      .subscribe({
        next: callback,
        error
      });
  }
}
