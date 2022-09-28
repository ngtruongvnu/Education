import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardProfileComponent } from './student-dashboard-profile.component';

describe('StudentDashboardProfileComponent', () => {
  let component: StudentDashboardProfileComponent;
  let fixture: ComponentFixture<StudentDashboardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
