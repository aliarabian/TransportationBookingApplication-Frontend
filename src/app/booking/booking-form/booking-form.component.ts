import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
import {catchError} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {BookingFailedModalComponent} from "../booking-failed-modal/booking-failed-modal.component";
import {SseService} from "../sse.service";


@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit, OnDestroy {

  passengersForm: FormArray = this.fb.array([])
  flight: Flight | undefined;
  selectedSection: SeatingSection | undefined;
  subscriptions: Subscription[] = [];
  countries?: Observable<Country[]>;
  validPassportExpiryDate?: Date;
  seats: FormControl = new FormControl('');
  unavailableSeats: any[] = []

  constructor(private fb: FormBuilder, private router: Router, private flightService: FlightsSearchService, private activateRoute: ActivatedRoute,
              private countriesService: CountriesService, private bookingService: BookingService, private dialog: MatDialog, private sseService: SseService) {
  }

  ngOnInit(): void {
    this.initializeFlightDetails();
    this.countries = this.countriesService.fetchAllCountries();
    this.addPassengerForm();

    let flightId = Number(this.activateRoute.snapshot.queryParamMap.get("flightId"));
    const sectionId = Number(this.activateRoute.snapshot.queryParamMap.get("sectionId"));
    this.sseService.getServerSentEvent(`/flights/${flightId}/sections/${sectionId}`)
      .subscribe(event => {
        this.selectedSection = JSON.parse(event.data);
        this.unavailableSeats = this.getUnavailableSeats();
        if (this.unavailableSeats.length > 0) {
          setTimeout(() => this.unavailableSeats = [], 5000);
        }
        if (this.unavailableSeats.length == this.seats.value.length)
          this.seats.setValue([]);
        else {
          console.log(this.seats.value)
          console.log(this.unavailableSeats)
          const availableSeats = this.seats.value.filter((seat: any) => !this.unavailableSeats.some(s => s == seat.seatNO));
          console.log(availableSeats);
          this.seats.setValue(availableSeats);
        }
      }, error => console.log(error));
  }

  private getUnavailableSeats(): string[] {
    if (this.seats.value == '') {
      return [];
    }
    let unavailableSeats =
      this.seats.value.filter((seat: any) => !this.selectedSection?.seats.some(s => s.id == seat.id))
        .map((seat: any) => seat.seatNO);
    return unavailableSeats ? unavailableSeats : [];
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
    this.bookingService.bookTicketsWithRequestedSeats(bookingRequest)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(() => err)
        })
      )
      .subscribe(
        response => {
          this.passengersForm.reset();
          this.router.navigate(['checkout'], {state: {tickets: response.data}, relativeTo: this.activateRoute})

        }, error => {
          this.passengersForm.reset();
          this.dialog.open(BookingFailedModalComponent)
        });

  }

  private createBookingRequest() {
    let bookingDetails = this.passengers().map(passenger => new BookingDetails([], new PassengerDetails(passenger.value.firstName,
      passenger.value.lastName, passenger.value.nationalId, passenger.value.birthDate,
      passenger.value.passportNO, passenger.value.expiresAt, passenger.value.issuedIn)));
    console.log(this.seats.value)
    return new BookingRequest(924427, this.flight!.id,
      this.selectedSection?.id!, bookingDetails, this.seats.value.map((seat: any) => seat.id));
  }

  hasError(formGroup: FormGroup, formControlName: string, errorTitle: string): boolean {
    return formGroup.controls[formControlName].hasError(errorTitle) &&
      this.isTouched(formGroup, formControlName);
  }

  isInvalid(formGroup: FormGroup, formControlName: string): boolean {
    return formGroup.controls[formControlName].invalid && this.isTouched(formGroup, formControlName);
  }

  private isTouched(formGroup: FormGroup, formControlName: string): boolean {
    return formGroup.controls[formControlName].touched;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate() {
    return !this.passengersForm.valid;
  }

  openAlertDialog() {
    return confirm("Do you want to leave before completing your booking request?");
  }
}
