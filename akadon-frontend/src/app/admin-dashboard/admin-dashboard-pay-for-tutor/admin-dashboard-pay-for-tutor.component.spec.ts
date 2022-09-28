import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardPayForTutorComponent } from './admin-dashboard-pay-for-tutor.component';

describe('AdminDashboardPayForTutorComponent', () => {
  let component: AdminDashboardPayForTutorComponent;
  let fixture: ComponentFixture<AdminDashboardPayForTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardPayForTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardPayForTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
