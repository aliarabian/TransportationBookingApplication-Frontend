import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../flights-list/flight";
import {FlightsSearchService} from "../flights-list/flights-search.service";
import {ActivatedRoute} from "@angular/router";
import {PassengerDetails} from "./passenger-details";
import {BookingDetails} from "./booking-details";
import {BookingRequest} from "./booking-request";
import {BookingService} from "./booking.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  passengersForm: FormArray = this.fb.array([])
  flight: Flight | undefined;
  sectionId: number | undefined;

  constructor(private fb: FormBuilder, private flightService: FlightsSearchService, private activateRoute: ActivatedRoute,
              private bookingService: BookingService) {
  }

  addPassengerForm(): void {

    let passengerDetailsForm: FormGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nationalId: ['', [Validators.required]],
      birthDate: [null, [Validators.required]],
      passportNO: ['', [Validators.required]],
      issuedIn: ['', Validators.required],
      expiresAt: [null, Validators.required]
    });

    this.passengersForm.push(passengerDetailsForm);
  }

  passengers(): FormGroup[] {
    return this.passengersForm.controls as FormGroup[];
  }

  ngOnInit(): void {
    let flightId = Number(this.activateRoute.snapshot.queryParamMap.get("flightId"));
    this.sectionId = Number(this.activateRoute.snapshot.queryParamMap.get("sectionId"));
    this.flightService.getFlight(flightId)
      .subscribe(response => {
        this.flight = response.data;
      })
    this.addPassengerForm();
  }

  removeForm(i: number) {
    this.passengersForm.removeAt(i);
  }

  onSubmit() {
    console.log(this.flight);
    console.log(this.passengersForm)
    let bookingDetails = this.passengers().map(passenger => new BookingDetails([], new PassengerDetails(passenger.value.firstName,
      passenger.value.lastName, passenger.value.nationalId, passenger.value.birthDate,
      passenger.value.passportNO, passenger.value.expiresAt, passenger.value.issuedIn)));
    let bookingRequest = new BookingRequest(924427, this.flight!.id, this.sectionId!, bookingDetails);
    console.log(bookingDetails);
    this.bookingService.bookTickets(bookingRequest)
      .subscribe(response => console.log(response.data));
  }
}
