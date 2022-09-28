import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardReceiveComponent } from './student-dashboard-receive.component';

describe('StudentDashboardReceiveComponent', () => {
  let component: StudentDashboardReceiveComponent;
  let fixture: ComponentFixture<StudentDashboardReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
