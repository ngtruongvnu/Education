import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardSendComponent } from './student-dashboard-send.component';

describe('StudentDashboardSendComponent', () => {
  let component: StudentDashboardSendComponent;
  let fixture: ComponentFixture<StudentDashboardSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
