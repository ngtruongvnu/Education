import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardSubjectManageComponent } from './admin-dashboard-subject-manage.component';

describe('AdminDashboardSubjectManageComponent', () => {
  let component: AdminDashboardSubjectManageComponent;
  let fixture: ComponentFixture<AdminDashboardSubjectManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardSubjectManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardSubjectManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
