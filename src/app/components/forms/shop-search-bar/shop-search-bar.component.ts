import { Component, Input } from "@angular/core";
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { tradeTypes } from 'src/app/services/tools/trade.types';
import { TradeSearchService, TradeSearchData } from 'src/app/services/api/tradeSearch.service';
import { Trade } from 'src/app/models/Trade';
import { GeolocationService } from "../../../services/geolocation.service";
import { GeocodingService } from "../../../services/geocoding.service";
import { GeocoderResult } from "@agm/core";

interface SearchShopFormularFields {
  name: string;
  types: FormArray | boolean[]; //for getting data, it seems to be transformed as a boolean array
  address: string;
  nearMe: FormControl;
  lng: number;
  lat: number;
}

function multipleCheckboxRequireOne(fa: FormArray) {
  let valid = false;

  for (let x = 0; x < fa.length; ++x) {
    if (fa.at(x).value) {
      valid = true;
      break;
    }
  }
  return valid ? null : {
    multipleCheckboxRequireOne: true
  };
}

@Component({
  selector: 'shop-search-bar',
  templateUrl: 'shop-search-bar.component.html',
  styleUrls: ['shop-search-bar.component.css']
})
export class ShopSearchBarComponent {
  @Input('callback') callback: (shops: Trade[]) => any = (_) => { };
  @Input('rollback') rollback: () => any = () => {};
  formGroup: FormGroup;
  shopTypesForm: FormArray;
  tradeTypes: string[] = tradeTypes;

  constructor(private tradeSearchService: TradeSearchService,
              private formBuilder: FormBuilder,
              private geolocationService: GeolocationService,
              private geocodingService: GeocodingService) {
    this.initFormGroups();
  }

  initFormGroups() {
    this.shopTypesForm = this.formBuilder.array(
      this.tradeTypes.map((value: string) => this.formBuilder.control(false)),
      [multipleCheckboxRequireOne]
    );
    this.formGroup = this.formBuilder.group({
      name: null,
      types: this.shopTypesForm,
      address: null,
      nearMe: new FormControl(true)
    } as SearchShopFormularFields);
  }

  _rollback() {
    this.initFormGroups();
    this.rollback();
  }

  onSearch() {
    if ((this.formGroup.value as SearchShopFormularFields).nearMe) {
      this.geolocationService.getCurrentPosition(this.geoPositionCallback.bind(this), this.geolocationError);
    } else if ((this.formGroup.value as SearchShopFormularFields).address) {
      this.geocodingService.findLocation(
        (this.formGroup.value as SearchShopFormularFields).address,
        this.geoLocationCallback.bind(this),
        this.geolocationError
      );
    } else {
      this.sendRequest();
    }
  }

  get disabled(): boolean {
    if ((this.formGroup.value as SearchShopFormularFields).nearMe) {
        return false;
    }
    return Object.values(this.formGroup.value as SearchShopFormularFields).every((value: string | FormArray) => {
      return typeof (value) === "string" && !value ||
        typeof (value) !== "string" && !this.shopTypesForm.valid;
    });
  }

  positionWrapper(p: Position): {lng: number, lat: number} {
    return {lng: p.coords.longitude, lat: p.coords.latitude};
  }

  geocoderResultWrapper(res: GeocoderResult): {lng: number, lat: number} {
    return {lng: res.geometry.location.lng(), lat: res.geometry.location.lat()};
  }

  geoPositionCallback(p: Position) {
    let pos = this.positionWrapper(p);
    this.sendRequest(pos);
  }

  geoLocationCallback(res: GeocoderResult[]) {
    if (res.length == 0) {
      this.geolocationError();
    } else {
      let pos = this.geocoderResultWrapper(res[0]);
      this.sendRequest(pos);
    }
  }

  sendRequest(p?: {lng: number, lat: number}) {
    let searchFilters: SearchShopFormularFields = this.formGroup.value as SearchShopFormularFields;
    let searchData: TradeSearchData;
    if (p) {
      searchData = {
        name: searchFilters.name,
        types: tradeTypes.filter((value: string, index: number) => searchFilters.types[index]),
        lng: p.lng,
        lat: p.lat
      };
    } else {
      searchData = {
        name: searchFilters.name,
        types: tradeTypes.filter((value: string, index: number) => searchFilters.types[index])
      };
    }
    this.tradeSearchService.get(searchData, this.callback);
  }

  geolocationError() {
    window.alert("Activer la géolocalisation ou entrer une adresse.");
  }
}
