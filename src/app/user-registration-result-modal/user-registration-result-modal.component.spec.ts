import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserRegistrationResultModalComponent} from './user-registration-result-modal.component';

describe('UserRegistrationResultModalComponent', () => {
  let component: UserRegistrationResultModalComponent;
  let fixture: ComponentFixture<UserRegistrationResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegistrationResultModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
