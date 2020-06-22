import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FileSelectChangeEvent, FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { BeerService } from 'src/app/services/api/beer.service';
import { Beer } from 'src/app/models/Beer';
import { ToasterService } from 'src/app/services/tools/toaster.service';
import { ROUTES } from 'src/app/router/routes';
import { Router } from '@angular/router';
import { beerTypes } from 'src/app/services/tools/beer.types';


interface BeerFormularFields {
    id?: number;
    name: string;
    profilePict: File;
    type: string;
    alcoholLevel: number;
    description: string;
}

@Component({
    selector: 'app-beer-formular',
    templateUrl: './beer-formular.component.html',
    styleUrls: ['./beer-formular.component.css']
})
export class BeerFormularComponent implements OnInit {
    @Input() beer: Beer = null;

    @ViewChild('fileUploader') fileUploader: FileUploaderComponent;
    alcoholLevels = [];
    types: string[] = beerTypes;
    imageSrc: any = '';
    selectFile = null;
    selectFileName = '';

    formGroup: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private beerService: BeerService,
        private ngZone: NgZone,
        private toasterService: ToasterService,
        private router: Router
    ) {
        this.formGroup = this.formBuilder.group({
            name: '',
            profilePict: null,
            type: '',
            alcoholLevel: null,
            description: '',
        } as BeerFormularFields);
    }

    ngOnInit() {
        for (let i = 0; i <= 90; i++) {
            this.alcoholLevels.push(i);
        }

        if (this.beer) {
            this.formGroup = this.formBuilder.group(this.beer as BeerFormularFields);
            setTimeout(_ => this.fileUploader.imagePict = this.beer.profilePict as string, 0);
        }
    }
    get submitButtonLabel(): string {
        return this.beer === null ? 'Create' : 'Update';
    }

    private _formGroupFieldsAreNull(): boolean {
        return  !this.formGroup.value.name ||
                !this.formGroup.value.description ||
                !this.formGroup.value.profilePict ||
                !this.formGroup.value.type ||
                this.formGroup.value.alcoholLevel === undefined ||
                this.formGroup.value.alcoholLevel === null;
    }

    private _noChangesWithBeer(): boolean {
        return this.beer && (
            this.formGroup.value.name === this.beer.name &&
            this.formGroup.value.description === this.beer.description &&
            this.formGroup.value.profilePict === this.beer.profilePict &&
            this.formGroup.value.type === this.beer.type &&
            this.formGroup.value.alcoholLevel === this.beer.alcoholLevel
        );
    }

    get unsubmitable(): boolean {
        return  this._formGroupFieldsAreNull() ||
                this._noChangesWithBeer();
    }

    onSubmit(values: BeerFormularFields) {
        const beer: Beer = values;
        if (this.beer === null) {
            this.beerService.post(
                beer,
                (id: number) => {
                    beer.id = id;
                    this._showSuccess(beer);

                },
                (error: HttpErrorResponse) => {
                    this._showError(beer, error);
                });
        } else {
            this.beerService.put(
                beer,
                (id: number) => {
                    beer.id = id;
                    this._showSuccess(beer);
                },
                (error: HttpErrorResponse) => {
                    this._showError(beer, error);
                });
        }
    }

    onFileSelected(_: FileSelectChangeEvent) {
        this.formGroup.patchValue({
            profilePict: this.fileUploader.image
        });
    }

    private _showError(trade: Beer, error: HttpErrorResponse, message?: string) {
        this.ngZone.run(() => {
            this.toasterService.error(
                'Une erreur est survenue !',
                message ?? error.message
            );
        });
    }

    private _showSuccess(beer: Beer) {
        this.toasterService.success(
            `Votre bière ${beer.name} a été ${this.beer ? 'mise à jour' : 'créé'} !`,
            'Vous pouvez la trouver dans la liste des bières'
        ).onTap.subscribe(() => this.router.navigate([ROUTES.beers.path]));
    }

}
