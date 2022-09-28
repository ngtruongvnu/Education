import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardFinanceComponent } from './admin-dashboard-finance.component';

describe('AdminDashboardFinanceComponent', () => {
  let component: AdminDashboardFinanceComponent;
  let fixture: ComponentFixture<AdminDashboardFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
