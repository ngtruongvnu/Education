import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardHeaderComponent } from './student-dashboard-header.component';

describe('StudentDashboardHeaderComponent', () => {
  let component: StudentDashboardHeaderComponent;
  let fixture: ComponentFixture<StudentDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
