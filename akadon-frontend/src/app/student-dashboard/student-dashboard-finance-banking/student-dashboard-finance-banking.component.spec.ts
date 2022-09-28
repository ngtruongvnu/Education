import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardFinanceBankingComponent } from './student-dashboard-finance-banking.component';

describe('StudentDashboardFinanceBankingComponent', () => {
  let component: StudentDashboardFinanceBankingComponent;
  let fixture: ComponentFixture<StudentDashboardFinanceBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardFinanceBankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardFinanceBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
