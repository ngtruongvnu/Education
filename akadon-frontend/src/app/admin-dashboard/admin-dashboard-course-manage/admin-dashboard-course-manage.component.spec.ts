import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCourseManageComponent } from './admin-dashboard-course-manage.component';

describe('AdminDashboardCourseManageComponent', () => {
  let component: AdminDashboardCourseManageComponent;
  let fixture: ComponentFixture<AdminDashboardCourseManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardCourseManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardCourseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
