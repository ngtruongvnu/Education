import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardLevelManageComponent } from './admin-dashboard-level-manage.component';

describe('AdminDashboardLevelManageComponent', () => {
  let component: AdminDashboardLevelManageComponent;
  let fixture: ComponentFixture<AdminDashboardLevelManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardLevelManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardLevelManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
