import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardNotetipComponent } from './student-dashboard-notetip.component';

describe('StudentDashboardNotetipComponent', () => {
  let component: StudentDashboardNotetipComponent;
  let fixture: ComponentFixture<StudentDashboardNotetipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardNotetipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardNotetipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
