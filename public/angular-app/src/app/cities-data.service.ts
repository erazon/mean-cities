import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { City } from './cities/cities.component';

@Injectable({
  providedIn: 'root'
})
export class CitiesDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) {}

  public getCities(count:string, offset:string): Observable<City[]> {
    const url: string= this.apiBaseUrl + "/cities?count=" + count + "&offset=" + offset;
    
    return this.http.get<City[]>(url);
  }
  
  public getNearByCities(lng:number, lat:number): Observable<City[]> {
    const url: string= this.apiBaseUrl + "/cities?lng=" + lng + "&lat=" + lat;
    
    return this.http.get<City[]>(url);
  }
  
  public getCitiesBySearch(city:string): Observable<City[]> {
    const url: string= this.apiBaseUrl + "/cities/search?city=" + city;
    
    return this.http.get<City[]>(url);
  }

  public getCity(cityId: string): Observable<City> {
    const url: string= this.apiBaseUrl + "/cities/" + cityId;
    
    return this.http.get<City>(url);
  }

}
