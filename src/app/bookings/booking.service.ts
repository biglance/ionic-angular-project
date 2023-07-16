import { Injectable } from "@angular/core";
import { Booking } from "./booking.module";

@Injectable({
  providedIn: "root"
})
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: 'b1',
      placeId: 'P1',
      placeTitle: 'Camps Bay Beach',
      guestNumber: 2,
    }
  ];

  get bookings() {
    return [...this._bookings];
  }
}
