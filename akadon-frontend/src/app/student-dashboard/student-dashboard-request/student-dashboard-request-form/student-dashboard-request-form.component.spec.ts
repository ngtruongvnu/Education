import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardRequestFormComponent } from './student-dashboard-request-form.component';

describe('StudentDashboardRequestFormComponent', () => {
  let component: StudentDashboardRequestFormComponent;
  let fixture: ComponentFixture<StudentDashboardRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
