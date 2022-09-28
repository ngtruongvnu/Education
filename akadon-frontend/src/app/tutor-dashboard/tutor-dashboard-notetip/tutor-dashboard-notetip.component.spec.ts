import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDashboardNotetipComponent } from './tutor-dashboard-notetip.component';

describe('TutorDashboardNotetipComponent', () => {
  let component: TutorDashboardNotetipComponent;
  let fixture: ComponentFixture<TutorDashboardNotetipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorDashboardNotetipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDashboardNotetipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
