import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CitiesDataService } from '../cities-data.service';
import { City } from '../cities/cities.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  cities: City[] = [];
  #searchForm!: FormGroup;
  get searchForm(){return this.#searchForm;}

  constructor(private cityService:CitiesDataService) {
    this.#searchForm = new FormGroup({
      city: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.cityService.getCitiesBySearch(this.#searchForm.value.city).subscribe({
      next:(cities)=>{
        console.log(cities);
        this.cities = cities
      },
      error: (err)=>{
        console.log(err);
        this.cities = [];
      }
    })
  }

}
