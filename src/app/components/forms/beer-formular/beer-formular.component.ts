import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


interface BeerFormularFields{
  name: string;
  pic: File;
  type: string;
  alcoholLevel: number;
  desc: string;
}

@Component({
  selector: 'app-beer-formular',
  templateUrl: './beer-formular.component.html',
  styleUrls: ['./beer-formular.component.css']
})
export class BeerFormularComponent implements OnInit {

  alcoholLevels = [];
  types = ["Blonde", "Brune", "Rousse", "Chatain", "Chauve"];
  imageSrc: any = '';
  selectFile = null;
  selectFileName = '';

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private httpclient: HttpClient){
      this.formGroup = this.formBuilder.group({
          name: '',
          pic: null,
          type: '',
          alcoholLevel: null,
          desc: '',
      } as BeerFormularFields);
  }

  ngOnInit() {
    for (var i = 0; i <= 90; i++) {
      this.alcoholLevels.push(i);
    }
  }

  onSubmit(values: BeerFormularFields){
    values.pic = this.selectFile;
    console.log(values);
  }

  selectedFile: File

  onFileChanged(event) {
    this.selectFile = event.target.files[0];
    this.selectFileName = event.target.files[0].name;
  }

}
