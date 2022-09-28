import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardRequestReceiveComponent } from './tutor-dashboard-request-receive.component';

describe('TutorDashboardRequestReceiveComponent', () => {
  let component: TutorDashboardRequestReceiveComponent;
  let fixture: ComponentFixture<TutorDashboardRequestReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardRequestReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardRequestReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
