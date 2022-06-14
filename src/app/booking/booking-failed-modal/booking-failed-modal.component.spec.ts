import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFailedModalComponent } from './booking-failed-modal.component';

describe('BookingFailedModalComponent', () => {
  let component: BookingFailedModalComponent;
  let fixture: ComponentFixture<BookingFailedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingFailedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFailedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
