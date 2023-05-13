import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  area: number = 1000;
  bhk: number = 2;
  bathrooms: number = 2;
  location: string = '';
  estimatedPrice!: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLocationNames();
  }

  getBathValue(): number {
    const uiBathrooms = document.getElementsByName("uiBathrooms");
    for (let i = 0; i < uiBathrooms.length; i++) {
      const checkbox = uiBathrooms[i] as HTMLInputElement;
      if (checkbox.checked) {
        return parseInt(checkbox.value);
      }
    }
    return -1; // Invalid Value
  }
  
  getBHKValue(): number {
    const uiBHK = document.getElementsByName("uiBHK");
    for (let i = 0; i < uiBHK.length; i++) {
      const checkbox = uiBHK[i] as HTMLInputElement;
      if (checkbox.checked) {
        return parseInt(checkbox.value);
      }
    }
    return -1; // Invalid Value
  }
  

  onClickedEstimatePrice(): void {
    console.log("Estimate price button clicked");
    console.log(this.area, this.bhk, this.bathrooms, this.location);

    const url = "http://localhost:5000/predict_home_price";
    this.http.post<any>(url, {
      total_sqft: parseFloat(this.area.toString()),
      size: this.bhk.toString(),
      bath: this.bathrooms.toString(),
      location: this.location
    }).subscribe(data => {
      this.estimatedPrice = data.estimated_price;
    });
  }

  getLocationNames(): void {
    const url = "http://localhost:5000/get_location_names";
    this.http.get<any>(url).subscribe(data => {
      const locations = data.locations;
      this.location = ''; // Clear the selected location
      // Assuming you have a FormControl for the location in your form
      // You can update the FormControl value instead of directly assigning to this.location if using Reactive Forms
      for (let i = 0; i < locations.length; i++) {
        if (i === 0) {
          this.location = locations[i];
        }
        // Do something with the locations[i] if needed
      }
    });
  }
}
