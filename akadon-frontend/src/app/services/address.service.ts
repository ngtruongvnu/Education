import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Address from '../../../address.json';
import { City } from '../models/city';
@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getAllCities() {
    return Address.City;
  }

  getCityById(id: string) {
    var city: City = Address.City.filter((c) => c.id === id)[0];
    return city;
  }
}
