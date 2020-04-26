import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

interface BeerFormularFields{
  name: string;
  pic: string;
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

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder){
      this.formGroup = this.formBuilder.group({
          name: '',
          pic: '',
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
    console.log(values);
  }

  onFileSelect(event) {
      this.selectFile = event.target.files[0];
      console.log('le type du fichier est : ', event.target.files[0].type);
  }


}
