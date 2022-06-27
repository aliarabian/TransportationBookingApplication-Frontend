import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FlightCardModalComponent} from './flight-card-modal.component';

describe('FlightCardModalComponent', () => {
  let component: FlightCardModalComponent;
  let fixture: ComponentFixture<FlightCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightCardModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
