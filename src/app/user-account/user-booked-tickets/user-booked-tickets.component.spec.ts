import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBookedTicketsComponent} from './user-booked-tickets.component';

describe('UserBookedTicketsComponent', () => {
  let component: UserBookedTicketsComponent;
  let fixture: ComponentFixture<UserBookedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBookedTicketsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
