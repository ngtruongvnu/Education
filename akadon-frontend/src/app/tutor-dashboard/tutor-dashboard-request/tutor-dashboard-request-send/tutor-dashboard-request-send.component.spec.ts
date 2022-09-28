import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardRequestSendComponent } from './tutor-dashboard-request-send.component';

describe('TutorDashboardRequestSendComponent', () => {
  let component: TutorDashboardRequestSendComponent;
  let fixture: ComponentFixture<TutorDashboardRequestSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardRequestSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardRequestSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
