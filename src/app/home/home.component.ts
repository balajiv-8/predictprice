import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sqft!: number;
  bhk!: number;
  bathrooms!: number;
  locations!: string[];
  estimatedPrice!: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLocations();
  }

  onClickedEstimatePrice(): void {
    console.log("Estimate price button clicked");
    const url = '/api/predict_home_price'; // Use this if you are using nginx. The nginx configuration should route requests for "/api" to the API server.
    this.http.post<any>(url, {
      total_sqft: parseFloat(this.sqft.toString()),
      size: this.bhk,
      bath: this.bathrooms,
      location: this.locations[0]
    }).subscribe(data => {
      console.log(data.estimated_price);
      this.estimatedPrice = data.estimated_price;
      console.log(status);
    });
  }

  getLocations(): void {
    const url = '/api/get_location_names'; // Use this if you are using nginx. The nginx configuration should route requests for "/api" to the API server.
    this.http.get<any>(url).subscribe(data => {
      console.log('got response for get_location_names request');
      if (data) {
        this.locations = data.locations;
      }
    });
  }

  getBathValue(): number {
    const uiBathrooms = <HTMLInputElement[]><unknown>document.getElementsByName('uiBathrooms');
    for (let i = 0; i < uiBathrooms.length; i++) {
      if (uiBathrooms[i].checked) {
        return parseInt(uiBathrooms[i].value);
      }
    }
    return -1;
  }

  getBHKValue(): number {
    const uiBHK = <HTMLInputElement[]><unknown>document.getElementsByName('uiBHK');
    for (let i = 0; i < uiBHK.length; i++) {
      if (uiBHK[i].checked) {
        return parseInt(uiBHK[i].value);
      }
    }
    return -1;
  }
}
