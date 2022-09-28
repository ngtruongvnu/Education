import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardFinanceRevenueComponent } from './student-dashboard-finance-revenue.component';

describe('StudentDashboardFinanceRevenueComponent', () => {
  let component: StudentDashboardFinanceRevenueComponent;
  let fixture: ComponentFixture<StudentDashboardFinanceRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardFinanceRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardFinanceRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
