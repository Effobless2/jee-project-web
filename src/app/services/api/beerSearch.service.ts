import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpService } from '../tools/http.service';
import { Beer } from 'src/app/models/Beer';
import { HttpErrorResponse } from '@angular/common/http';

export interface BeerSearchDatas{
    name: string;
    types?: string[];
    alcoholLevel?: number;
}

@Injectable()
export class BeerSearchService {
    private controllerUrl: string = `${environment.beererApiUrl}beers/search`;

    constructor(private httpService: HttpService){}

    get(datas: BeerSearchDatas, callback: (result: Beer[]) => any, error?: (err: HttpErrorResponse) => any){
        return this.httpService.get(`${this.controllerUrl}?name=${datas.name ?? "" }&types=${datas.types ?? "" }&alcoholLevel=${datas.alcoholLevel ?? ""}`)
            .subscribe({
                next: callback,
                error: error
            });
    }


}