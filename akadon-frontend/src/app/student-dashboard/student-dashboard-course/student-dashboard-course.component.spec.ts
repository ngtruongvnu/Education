import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardCourseComponent } from './student-dashboard-course.component';

describe('StudentDashboardCourseComponent', () => {
  let component: StudentDashboardCourseComponent;
  let fixture: ComponentFixture<StudentDashboardCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
