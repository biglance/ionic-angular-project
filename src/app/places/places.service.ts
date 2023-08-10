import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Camps Bay Beach',
      'In the heart of Cape town',
      'https://www.capetownwithkids.com/wp-content/uploads/2022/09/Camps-Bay-Beach-Crystal-Water-scaled.jpg',
      850.99,
      new Date('2023-01-01'),
      new Date('2023-02-24')
    ),
    new Place(
      'p2',
      'Sunset Beach',
      'In the outskats of Cape town',
      'https://www.capefear-nc.com/images/uploads/static_content/365/sunset_beach_hero2.jpg',
      350.99,
      new Date('2023-02-01'),
      new Date('2023-03-12')
    ),
    new Place(
      'p3',
      'Cabo Beach Club',
      'Best luxury restaurant of Cape town',
      'https://www.luxuryrestaurantawards.com/wp-content/uploads/sites/9/2022/01/CBC_Pool_6-scaled.jpg',
      990.99,
      new Date('2023-03-01'),
      new Date('2023-04-15')
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }

}
