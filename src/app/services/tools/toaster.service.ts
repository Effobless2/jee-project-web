import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ToasterService{
    constructor(private toastrService: ToastrService){}

    private _options: any = {
        timeOut: 3000,
        progressBar: true
    }

    public success(title: string, message){
        this.toastrService.success(message, title, this._options);
    }

    public error(title: string, message){
        this.toastrService.error(message, title, this._options);
    }
}