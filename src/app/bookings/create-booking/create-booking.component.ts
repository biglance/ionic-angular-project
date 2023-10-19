import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Place } from '../../places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', { static: true }) form: NgForm;
  startDate: string;
  formattedStartDate: string;
  endDate: string;
  formattedEndDate: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();
      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();

      // Get the year, month, and day from the Date object
      const year = new Date(this.startDate).getFullYear();
      const month = String(new Date(this.startDate).getMonth() + 1).padStart(
        2,
        '0'
      ); // Months are 0-based, so add 1
      const day = String(new Date(this.startDate).getDate()).padStart(2, '0');

      const yearEnd = new Date(this.endDate).getFullYear();
      const monthEnd = String(new Date(this.endDate).getMonth() + 1).padStart(
        2,
        '0'
      ); // Months are 0-based, so add 1
      const dayEnd = String(new Date(this.endDate).getDate()).padStart(2, '0');

      // Format the date as YYYY-MM-DD
      this.formattedStartDate = `${year}-${month}-${day}`;
      this.formattedEndDate = `${yearEnd}-${monthEnd}-${dayEnd}`;
    }
  }

  onBookPlace() {
    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: +this.form.value['guest-number'],
          startDate: new Date(this.form.value['date-from']),
          endDate: new Date(this.form.value['date-to']),
        },
      },
      'confirm'
    );
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }
}
