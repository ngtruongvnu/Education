import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardCalendarComponent } from './tutor-dashboard-calendar.component';

describe('TutorDashboardCalendarComponent', () => {
  let component: TutorDashboardCalendarComponent;
  let fixture: ComponentFixture<TutorDashboardCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
