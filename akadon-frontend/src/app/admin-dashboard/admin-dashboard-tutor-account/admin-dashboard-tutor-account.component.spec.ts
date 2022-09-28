import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardTutorAccountComponent } from './admin-dashboard-tutor-account.component';

describe('AdminDashboardTutorAccountComponent', () => {
  let component: AdminDashboardTutorAccountComponent;
  let fixture: ComponentFixture<AdminDashboardTutorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardTutorAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardTutorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
