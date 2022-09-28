import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardStudentRequestComponent } from './admin-dashboard-student-request.component';

describe('AdminDashboardStudentRequestComponent', () => {
  let component: AdminDashboardStudentRequestComponent;
  let fixture: ComponentFixture<AdminDashboardStudentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardStudentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardStudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
