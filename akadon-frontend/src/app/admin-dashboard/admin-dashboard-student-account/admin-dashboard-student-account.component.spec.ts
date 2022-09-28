import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardStudentAccountComponent } from './admin-dashboard-student-account.component';

describe('AdminDashboardStudentAccountComponent', () => {
  let component: AdminDashboardStudentAccountComponent;
  let fixture: ComponentFixture<AdminDashboardStudentAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardStudentAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardStudentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
