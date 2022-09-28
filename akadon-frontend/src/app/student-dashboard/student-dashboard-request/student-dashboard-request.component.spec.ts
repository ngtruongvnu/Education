import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardRequestComponent } from './student-dashboard-request.component';

describe('StudentDashboardRequestComponent', () => {
  let component: StudentDashboardRequestComponent;
  let fixture: ComponentFixture<StudentDashboardRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
