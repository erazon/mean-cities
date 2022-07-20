import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CitiesDataService } from '../cities-data.service';

export class City {
  #_id!: String;
  #city!: String;
  #zip!: String;
  #loc!: {
    x: Number,
    y: Number
  };
  #location!: {
    coordinates: [number, number]
  };
  #pop!: Number;
  #state!: String;

  get _id() {return this.#_id};
  get city() {return this.#city;}
  get zip() {return this.#zip;}
  get x() {return this.#loc.x;}
  get y() {return this.#loc.y;}
  get pop() {return this.#pop;}
  get state() {return this.#state;}
  get location(){return this.#location;}
  
  set _id(_id) {this.#_id= _id;}
  set city(city) {this.#city= city;}
  set zip(zip) {this.#zip= zip;}
  set x(x) {this.#loc.x= x;}
  set y(y) {this.#loc.y= y;}
  set loc(loc:{x: Number,y: Number}) {this.#loc= loc;}
  set pop(pop) {this.#pop= pop;}
  set state(state) {this.#state= state;}
  
  constructor() {
    this.loc= {x: 0, y: 0};
  }
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities!: City[];
  cityCount!:number;
  nextDisabled!: string;
  previousDisabled: string = 'disabled';

  constructor(private cityService:CitiesDataService, private _route:ActivatedRoute, private _router:Router) {
    // let count = _route.snapshot.queryParams['count'];
    // if(!count){
    //   this.previousDisabled = 'disabled';
    // }
    let offset = _route.snapshot.queryParams['offset'];
    if(!offset || offset == '0'){
      this.previousDisabled = 'disabled';
    }
    else{
      this.previousDisabled = '';
    }
  }

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities(): void {
    let count = this._route.snapshot.queryParams['count'];
    if(!count){
      count = 5;
    }
    let offset = this._route.snapshot.queryParams['offset'];
    if(!offset){
      offset = 0;
    }
    count = parseInt(count);
    offset = parseInt(offset);
    if(offset>0){
      this.previousDisabled = '';
    }
    this.cityService.getCities(count, offset).subscribe({
      next: (cities)=> {
        this.cityCount = cities.length;
        if(this.cityCount<count){
          this.nextDisabled = 'disabled';
        }
        this.fillCities(cities)
      },
      error: (error)=>{this.cities= []; console.log(error);
      },
    });
  }

  private fillCities(cities: City[]) {
    this.cities= cities;
  }

  onPreviousClick(): void {
    console.log('previous clicked');
    
  }
  
  onNextClick(): void {
    console.log('next clicked');
    let count = this._route.snapshot.queryParams['count'];
    console.log(count);
    if(!count){
      count = 5;
    }

    let offset = this._route.snapshot.queryParams['offset'];
    console.log(offset);
    if(!offset){
      offset = 0;
    }
    count = parseInt(count);
    offset = parseInt(offset);

    offset += count;
    this._router.navigate(['cities'], {queryParams:{count:count,offset:offset}});
    this.getAllCities();
  }
}
