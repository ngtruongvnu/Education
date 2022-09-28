import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardCourseComponent } from './tutor-dashboard-course.component';

describe('TutorDashboardCourseComponent', () => {
  let component: TutorDashboardCourseComponent;
  let fixture: ComponentFixture<TutorDashboardCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
