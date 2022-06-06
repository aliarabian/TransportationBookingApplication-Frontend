import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../../home/flights-list/flight";
import {SeatingSection} from "../../home/flights-list/seating-section";
import {Observable, Subscription, throwError} from "rxjs";
import {Country} from "./country";
import {FlightsSearchService} from "../../home/flights-list/flights-search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CountriesService} from "./countries.service";
import {BookingService} from "../booking.service";
import {BookingDetails} from "./booking-details";
import {PassengerDetails} from "./passenger-details";
import {BookingRequest} from "./booking-request";
import {FlightTicket} from "../booking-result/flight-ticket";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.sass']
})
export class BookingFormComponent implements OnInit, OnDestroy {


  passengersForm: FormArray = this.fb.array([])
  flight: Flight | undefined;
  selectedSection: SeatingSection | undefined;
  subscriptions: Subscription[] = [];
  countries?: Observable<Country[]>;
  validPassportExpiryDate?: Date;

  constructor(private fb: FormBuilder, private router: Router, private flightService: FlightsSearchService, private activateRoute: ActivatedRoute,
              private countriesService: CountriesService, private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.initializeFlightDetails();
    this.countries = this.countriesService.fetchAllCountries();
    this.addPassengerForm();
  }

  private initializeFlightDetails() {
    let flightId = Number(this.activateRoute.snapshot.queryParamMap.get("flightId"));
    const sectionId = Number(this.activateRoute.snapshot.queryParamMap.get("sectionId"));
    let flightObservable = this.flightService.getFlight(flightId)
      .subscribe(response => {
        this.flight = response.data;
        this.validPassportExpiryDate = new Date(this.flight.departuresAt);
        this.validPassportExpiryDate.setDate(this.validPassportExpiryDate.getDate() + 10)
        this.selectedSection = this.flight.sections.find(section => section.id === sectionId);
      });
    this.subscriptions.push(flightObservable);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  addPassengerForm(): void {
    let passengerDetailsForm: FormGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nationalId: ['', [Validators.pattern("[0-9]{11}"), Validators.required]],
      birthDate: [null, [Validators.required]],
      passportNO: ['', [Validators.pattern("[0-9]{10}"), Validators.required]],
      issuedIn: [null, Validators.required],
      expiresAt: [null, Validators.required]
    });

    this.passengersForm.push(passengerDetailsForm);
  }

  passengers(): FormGroup[] {
    return this.passengersForm.controls as FormGroup[];
  }


  removeForm(i: number) {
    this.passengersForm.removeAt(i);
  }

  onSubmit() {
    let bookingRequest = this.createBookingRequest();
    this.bookingService.bookTickets(bookingRequest)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(() => err)
        })
      )
      .subscribe(
        response => {
          this.passengersForm.reset();
          this.router.navigate(['tickets'], {state: {tickets: response.data}, relativeTo: this.activateRoute})
        });
  }

  private createBookingRequest() {
    let bookingDetails = this.passengers().map(passenger => new BookingDetails([], new PassengerDetails(passenger.value.firstName,
      passenger.value.lastName, passenger.value.nationalId, passenger.value.birthDate,
      passenger.value.passportNO, passenger.value.expiresAt, passenger.value.issuedIn)));
    return new BookingRequest(924427, this.flight!.id,
      this.selectedSection?.id!, bookingDetails);
  }
}
