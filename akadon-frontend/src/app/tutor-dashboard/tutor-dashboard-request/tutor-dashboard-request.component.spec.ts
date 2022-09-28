import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardRequestComponent } from './tutor-dashboard-request.component';

describe('TutorDashboardRequestComponent', () => {
  let component: TutorDashboardRequestComponent;
  let fixture: ComponentFixture<TutorDashboardRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
