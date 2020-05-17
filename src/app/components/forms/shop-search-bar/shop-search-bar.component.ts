import { Component, Input } from "@angular/core";
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { tradeTypes } from 'src/app/services/tools/trade.types';
import { TradeSearchService, TradeSearchDatas } from 'src/app/services/api/tradeSearch.service';
import { Trade } from 'src/app/models/Trade';

interface SearchShopFormularFields {
  name: string;
  types: FormArray | boolean[]; //for getting datas, it seems to be transformed as a boolean array
  address: string;
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
              private formBuilder: FormBuilder) {
    this.shopTypesForm = this.formBuilder.array(
      this.tradeTypes.map((value: string) => this.formBuilder.control(false)),
      [multipleCheckboxRequireOne]
    );
    this.formGroup = this.formBuilder.group({
      name: null,
      types: this.shopTypesForm,
      address: null
    } as SearchShopFormularFields);
  }

  onSearch() {
    let searchFilters: SearchShopFormularFields = this.formGroup.value as SearchShopFormularFields;
    let searchDatas: TradeSearchDatas = {
      name: searchFilters.name,
      types: tradeTypes.filter((value: string, index: number) => searchFilters.types[index]),
      address: searchFilters.address
    }
    this.tradeSearchService.get(searchDatas, this.callback);
  }

  get disabled(): boolean {
    return Object.values(this.formGroup.value as SearchShopFormularFields).every((value: string | FormArray) => {
      return typeof (value) === "string" && !value ||
        typeof (value) !== "string" && !this.shopTypesForm.valid;
    });
  }
}
