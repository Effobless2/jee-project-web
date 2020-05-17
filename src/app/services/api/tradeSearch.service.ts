import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpService } from '../tools/http.service';
import { Trade } from 'src/app/models/Trade';
import { HttpErrorResponse } from '@angular/common/http';

export interface TradeSearchDatas{
  name: string;
  types?: string[];
  address?: string;
}

@Injectable()
export class TradeSearchService {
  private controllerUrl: string = `${environment.beererApiUrl}trade/search`;

  constructor(private httpService: HttpService){}

  get(datas: TradeSearchDatas, callback: (result: Trade[]) => any, error?: (err: HttpErrorResponse) => any){
    return this.httpService.get(`${this.controllerUrl}?name=${datas.name ?? "" }&types=${datas.types ?? "" }&address=${datas.address ?? ""}`)
      .subscribe({
        next: callback,
        error: error
      });
  }


}
