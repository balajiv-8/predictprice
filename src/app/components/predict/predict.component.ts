import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent {
  p = new FormControl('');
  submitted = false;
  constructor(private _http:HttpClient, private formBuilder: FormBuilder, private titleService:Title) { }
  predictForm!: FormGroup;
  loading = false;
  transitionBetweenPages() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    this.titleService.setTitle('PREDICT HOUSE PRICE');
  }
  areas = [
    { value: 'Chrompet', label: 'Chrompet'},
    { value: 'Velachery', label: 'Velachery'},
    { value: 'Anna Nagar', label: 'Anna Nagar'},
    { value: 'T Nagar', label: 'T Nagar'},
    { value: 'Karapakkam', label: 'Karapakkam'},
    { value: 'KK Nagar', label: 'KK Nagar'},
    { value: 'Adyar', label: 'Adyar'}
  ]

  bhks = [
    { value: 1, label: '1BHK'},
    { value: 2, label: '2BHK'},
    { value: 3, label: '3BHK'},
    { value: 4, label: '4BHK'}
  ]

  n_bathrooms = [
    { value: 1, label: '1'},
    { value: 2, label: '2'},
    { value: 3, label: '3'},
  ]
  ngOnInit(): void {
    this.predictForm = this.formBuilder.group({
      int_sqft: ['', Validators.required],
      area: ['', Validators.required],
      bhk: ['', Validators.required],
      n_bathroom:['', Validators.required]
    });
    this.transitionBetweenPages();
  }

  async predict() {
    this.submitted = true;
    if(this.predictForm.invalid) {return}
    else {
    console.log(this.predictForm.value);
    let formData = {
    int_sqft: this.predictForm.value.int_sqft,
    area: this.predictForm.value.area,
    bhk: this.predictForm.value.bhk,
    n_bathroom: this.predictForm.value.n_bathroom,
    };
    try {
    const response = await this._http.post('http://127.0.0.1:8000/predict_home_price', formData).toPromise();
    this.p.setValue(JSON.stringify(response).substring(19,23))
    } catch (error) {
    console.error(error);
    }
    }
    }
}
