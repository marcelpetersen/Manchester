import { Injectable } from '@angular/core';
import LatLngLiteral = google.maps.LatLngLiteral;

import { IContact, ISocial, IVenue } from './index';
import { LocationService } from '../location';

@Injectable()
export class VenueFactory {

  constructor(private locationService: LocationService) {}

  public fromRaw(venue: IVenue): IVenue;
  public fromRaw(venue: IVenue[]): IVenue[];
  public fromRaw(venue: IVenue|IVenue[]): IVenue|IVenue[] {
    if (Array.isArray(venue)) {
      return venue.map(venue => this.fromRaw(venue));
    }
    return new Venue(venue, this.locationService);
  }
}

export class Venue implements IVenue {
  $key: string;
  category: string;
  subcategory: string;
  name: string;
  subtitle: string;
  featured: boolean;
  priority: number;
  location: LatLngLiteral;
  bio: string;
  createdAt: string;
  updatedAt: string;
  contacts: IContact[];
  social: ISocial[];
  photos: string[];
  openingTimes: {
    [key: string]: {
      open: string;
      close: string;
    }
  };

  constructor(
    fromFirebase,
    private locationService: LocationService,
  ) {
    this.$key = fromFirebase.$key;
    const [category, subcategory] = this.$key.split('|||');
    Object.assign(this, {category, subcategory}, fromFirebase);
  };

  /**
   * Returns the distance from (what LocationService thinks is) the current location to this venue, in km
   */
  public getDistance(): number {
    return this.locationService.getDistance(this.location);
  }

  public toRaw(): IVenue {
    const clone = Object.assign({} ,this);
    delete clone.locationService;
    return clone;
  }

}
