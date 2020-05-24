import { ToastrService, ActiveToast } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ToasterService {
    constructor(private toastrService: ToastrService) {}

    private options = {
        timeOut: 3000,
        progressBar: true
    };

    public success(title: string, message): ActiveToast<any> {
        return this.toastrService.success(message, title, this.options);
    }

    public error(title: string, message): ActiveToast<any> {
        return this.toastrService.error(message, title, this.options);
    }
}
