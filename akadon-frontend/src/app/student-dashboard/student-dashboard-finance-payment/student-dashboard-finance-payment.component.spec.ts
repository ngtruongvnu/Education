import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardFinancePaymentComponent } from './student-dashboard-finance-payment.component';

describe('StudentDashboardFinancePaymentComponent', () => {
  let component: StudentDashboardFinancePaymentComponent;
  let fixture: ComponentFixture<StudentDashboardFinancePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardFinancePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardFinancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
