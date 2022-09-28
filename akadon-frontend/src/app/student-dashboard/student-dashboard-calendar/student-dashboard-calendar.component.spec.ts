import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardCalendarComponent } from './student-dashboard-calendar.component';

describe('StudentDashboardCalendarComponent', () => {
  let component: StudentDashboardCalendarComponent;
  let fixture: ComponentFixture<StudentDashboardCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
